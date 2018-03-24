from flask import Flask, request, Response
from flask_cors import CORS

from sales_predictor import SalesPredictor

app = Flask(__name__)
CORS(app)


@app.route('/api/predict/sales', methods=['GET'])
def predict_sales():
    day = request.args.get('day')
    weather = request.args.get('weather')

    predictor = SalesPredictor()
    res_prediction = predictor.predict_sales(day, weather)

    return Response(
        str(res_prediction),
        mimetype='application/json'
    )


if __name__ == '__main__':
    app.run(port=4000)
