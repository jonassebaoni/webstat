from sales_predictor import SalesPredictor


if __name__ == "__main__":
    predictor = SalesPredictor()

    res = predictor.predict_sales(1, 32)

    print(res)
