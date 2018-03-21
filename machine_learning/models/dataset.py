import json


class Dataset:
    def __init__(self):
        self.data = []
        self.target = []
        self.target_names = []
        self.feature_names = []

    def __str__(self):
        return json.dumps(self.__dict__)
