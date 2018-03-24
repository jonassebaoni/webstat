from sales_predictor import SalesPredictor


if __name__ == "__main__":
    predictor = SalesPredictor()

    res = predictor.predict_sales(0, 0)

    print(res)
