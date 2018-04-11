import json
import urllib.request
from collections import namedtuple

# Url de l'api pour récupérer les tickets que nous analyserons pendant le machine learning
API_URL = 'http://localhost:3000/api'


class TicketsApi:

    @staticmethod
    def get_tickets_info():
        # Recupèration les tickets via l'api
        res = urllib.request.urlopen(f'{API_URL}/ticketsInfo').read()

        # Conversion du résultat de la requète en objet compréhensible pour python (bytes -> json)
        return json.loads(res.decode('utf-8'),
                          object_hook=lambda d: namedtuple('X', ([key if key != '_id' else 'day' for key in d.keys()]))(*d.values())).data

