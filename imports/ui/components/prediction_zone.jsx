import React from 'react';
import Select from 'react-select';
import DatePicker from 'material-ui/DatePicker';
import DateRange from 'material-ui-icons/DateRange';
import axios from 'axios';
import { getDayOfYear } from '../../utils/date';


const styles = {
  dataRangeIcon: {
    width: 30,
    height: 30,
    marginTop: 8,
  },
  datePicker: {
    marginLeft: 10,
    marginRight: 10,
    width: 150,
  },
  datePickerTextField: {
    width: 150,
  },
};

class PredictionZone extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedDate: new Date(),
      selectedWeather: null,
      predictionResult: '',
    };

    this.handleDateSelected = this.handleDateSelected.bind(this);
    this.handleWeatherSelected = this.handleWeatherSelected.bind(this);
    this.launchPrediction = this.launchPrediction.bind(this);
  }

  weatherOptions = [
    {
      label: 'Rain',
      value: 10,
    },
    {
      label: 'Sunny',
      value: 32,
    },
  ];

  handleDateSelected(event, date) {
    this.setState(
      { selectedDate: date },
      () => {
        this.launchPrediction();
      },
    );
  }

  handleWeatherSelected(weather) {
    this.setState(
      { selectedWeather: weather },
      () => {
        this.launchPrediction();
      },
    );
  }

  launchPrediction() {
    if (!this.state.selectedDate || !this.state.selectedWeather) return;

    this.setState(
      { predictionResult: '' },
      () => {
        const dayOfYear = getDayOfYear(this.state.selectedDate);

        axios({
          method: 'get',
          url: `http://localhost:4000/api/predict/sales?day=${dayOfYear}&weather=${this.state.selectedWeather.value}`,
        })
          .then((response) => {
            const prediction = response.data;

            switch (prediction) {
              case 0:
                this.setState({ predictionResult: 'Mediocre sales' });
                break;
              case 1:
                this.setState({ predictionResult: 'Bad sales' });
                break;
              case 2:
                this.setState({ predictionResult: 'Average sales' });
                break;
              case 3:
                this.setState({ predictionResult: 'Good sales' });
                break;
              case 4:
                this.setState({ predictionResult: 'Excellent sales' });
                break;
              default:
                break;
            }
          })
          .catch(() => {});
      },
    );

  }

  render() {
    return (
      <div className="predictionContainer">
        <h2> Sales prediction </h2>
        <div>
          <p>
            Choice the date and the weather on the input bellow to predict the sales amounts
          </p>

          <div className="inputsContainer">
            <div className="dataPickerContainer">
              <DateRange style={styles.dataRangeIcon} />
              <DatePicker
                id="time"
                value={this.state.selectedDate}
                onChange={this.handleDateSelected}
                style={styles.datePicker}
                textFieldStyle={styles.datePickerTextField}
              />
            </div>
            <Select
              id="weatherSelector"
              searchPromptText="Select weather"
              value={this.state.selectedWeather}
              onChange={this.handleWeatherSelected}
              options={this.weatherOptions}
              clearable={false}
            />
          </div>

          {this.state.predictionResult !== '' ?
            <p className="predictionMessageContainer">
              For this configuration the sales will be: <br />
              <b className="predictionMessage">{this.state.predictionResult}</b>
            </p>
            : null
          }
        </div>
      </div>
    );
  }
}

export default PredictionZone;
