import json
import math
import numpy as np
import pandas as pd
import urllib.request
import matplotlib.pyplot as plt
import seaborn as sns
from collections import namedtuple
from sklearn.ensemble import RandomForestClassifier
from sklearn.model_selection import train_test_split
from sklearn.metrics import accuracy_score
from models import Dataset


# Url de l'api pour récupérer les tickets que nous analyserons pendant le machine learning
API_URL = 'http://localhost:3000/api'
API_VERSION = 1


# Variable de configuration pour machine learning
TARGETS_FEATURE_NAMES = ['Date', 'Météo']
INDICATORS = ['Médiocre vente', 'Mauvaise vente', 'Moyenne vente', 'Bonne vente', 'Excellente vente']
TARGETS_NUMBER = len(INDICATORS)


def get_tickets_info():
    # Recupèration les tickets via l'api
    res = urllib.request.urlopen(f'{API_URL}/v{API_VERSION}/ticketsInfo').read()

    # Conversion du résultat de la requète en objet compréhensible pour python (bytes -> json)
    tickets_info = json.loads(res.decode('utf-8'), object_hook=lambda d: namedtuple('X', ([key if key != '_id' else 'day' for key in d.keys()]))(*d.values())).data

    return tickets_info


def prepare_dataset(tickets_info):
    dataset = Dataset()

    # Récupération du nombre de tickets
    # Ce nombre va servir à séparer en plusieurs partie le dataset
    # Chaque partie representera un niveau de vente
    # Exemple: 0 = mauvais vente, 1: moyenne vente, 2: bonne vente
    number_of_tickets = len(tickets_info)

    # Triage des informations de vente de ticket par le nombre de vente
    tickets_info = sorted(tickets_info, key=lambda tup: tup[2])

    for index, ticket in enumerate(tickets_info):
        dataset.data.append([ticket[0], ticket[1]])
        dataset.target.append(math.floor(TARGETS_NUMBER * index / number_of_tickets))

    dataset.target_names = [i for i in range(0, TARGETS_NUMBER)]

    dataset.feature_names = TARGETS_FEATURE_NAMES

    return dataset


def train_classifier(data_frame, dataset):
    X_train, X_test, y_train, y_test = train_test_split(data_frame[dataset.feature_names],
                                                        dataset.target,
                                                        test_size=0.3,
                                                        stratify=dataset.target,
                                                        random_state=123456)

    rf = RandomForestClassifier(n_estimators=100, oob_score=True, random_state=123456)
    rf.fit(X_train, y_train)

    predicted = rf.predict(X_test)
    accuracy = accuracy_score(y_test, predicted)
    print(f'Out-of-bag score estimate: {rf.oob_score_:.3}')
    print(f'Mean accuracy score: {accuracy:.3}')


if __name__ == "__main__":
    # Récupération des données
    tickets_info = get_tickets_info()

    # Préparation du dataset avant la création du dataset
    dataset = prepare_dataset(tickets_info)

    # Création du dataframe pour l'analyse
    data_frame = pd.DataFrame(dataset.data, columns=dataset.feature_names)

    # Add a column for vente visualisation
    data_frame['Vente'] = np.array([dataset.target_names[i] for i in dataset.target])

    #sns.pairplot(data_frame, hue='Vente')
    #plt.show()

    train_classifier(data_frame, dataset)
