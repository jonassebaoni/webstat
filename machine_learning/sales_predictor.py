import math
import pandas as pd
import numpy as np
import _pickle as cPickle
import matplotlib.pyplot as plt
import seaborn as sns
from sklearn.ensemble import RandomForestClassifier
from sklearn.model_selection import train_test_split
from sklearn.metrics import accuracy_score

from models import Dataset
from tickets_api import TicketsApi


# Variable de configuration pour machine learning
TARGETS_FEATURE_NAMES = ['Date', 'Météo']
INDICATORS = ['Médiocre vente', 'Mauvaise vente', 'Moyenne vente', 'Bonne vente', 'Excellente vente']
TARGETS_NUMBER = len(INDICATORS)


class SalesPredictor:
    def __init__(self, path_to_predictor_model='./rf.model'):
        self._path_to_predictor_model = path_to_predictor_model
        self._rf = None

        try:
            # Chargement du modèle lors de la création de l'objet
            self._load_model()
        except IOError:
            # Si une erreur est survenue lors du chargement on entraine le modèle
            self.train_predictor(show_train_result=True)

    def train_predictor(self, show_train_result=False):
        # Récupération des données
        tickets_info = TicketsApi.get_tickets_info()

        dataset = self._prepare_dataset(tickets_info)

        # Création du dataframe pour l'analyse
        data_frame = pd.DataFrame(dataset.data, columns=dataset.feature_names)

        # Entrainement du modèle
        rf, predicted, accuracy = self._train(data_frame, dataset)

        # Sauvegarde du model de prédiction pour de future usage
        self._save_model(rf)
        self._rf = rf

        if show_train_result:
            print(f'Out-of-bag score estimate: {rf.oob_score_:.3}')
            print(f'Mean accuracy score: {accuracy:.3}')

            # Add a column for vente visualisation
            data_frame['Vente'] = np.array([dataset.target_names[i] for i in dataset.target])

            sns.pairplot(data_frame, hue='Vente')
            plt.show()

    def predict_sales(self, day, weather):
        if self._rf is None:
            print('Please train predictor before')
            return

        return self._rf.predict(np.array([day, weather]).reshape(1, -1))[0]

    @staticmethod
    def _prepare_dataset(tickets_info):
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

    @staticmethod
    def _train(data_frame, dataset):
        X_train, X_test, y_train, y_test = train_test_split(data_frame[dataset.feature_names],
                                                            dataset.target,
                                                            test_size=0.3,
                                                            stratify=dataset.target,
                                                            random_state=123456)

        rf = RandomForestClassifier(n_estimators=100, oob_score=True, random_state=123456)
        rf.fit(X_train, y_train)
        predicted = rf.predict(X_test)
        accuracy = accuracy_score(y_test, predicted)

        return rf, predicted, accuracy

    def _save_model(self, rf):
        with open(self._path_to_predictor_model, 'wb') as f:
            cPickle.dump(rf, f)

    def _load_model(self):
        with open(self._path_to_predictor_model, 'rb') as f:
            self._rf = cPickle.load(f)
