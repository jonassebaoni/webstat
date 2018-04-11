import React from 'react';
import Select from 'react-select';
import Toggle from 'material-ui/Toggle';
import DatePicker from 'material-ui/DatePicker';
import DateRange from 'material-ui-icons/DateRange';
import PropTypes from 'prop-types';


const styles = {
  dataRangeIcon: {
    width: 30,
    height: 30,
    marginTop: 8,
  },
  datePicker: {
    marginLeft: 10,
    marginRight: 10,
    width: 100,
  },
  datePickerTextField: {
    width: 100,
  },
  toggle: {
    width: 'auto',
  },
};

class ConfigurationBar extends React.PureComponent {
  render() {
    const companies = this.props.companies.map(company =>
      ({ value: company._id, label: company.name }));

    return (
      <section id="configurationBar">
        <div className="selectTypeContainer">
          <div>Prévisions</div>
          <Toggle
            toggled={this.props.selectedType}
            onToggle={this.props.handleDisplayTypeChanged}
            labelPosition="right"
            style={styles.toggle}
          />
          <div>Statistiques</div>
        </div>

        <div className="inputsContainer">
          <DateRange style={styles.dataRangeIcon} />
          <div>
            <DatePicker
              id="time"
              value={this.props.selectedDate}
              onChange={this.props.handleDateSelected}
              style={styles.datePicker}
              textFieldStyle={styles.datePickerTextField}
            />
          </div>
          <Select
            name="Company selected"
            value={this.props.selectedCompany}
            onChange={this.props.handleCompanySelected}
            options={companies}
            clearable={false}
          />
        </div>

        <div />
      </section>
    );
  }
}

ConfigurationBar.propTypes = {
  selectedDate: PropTypes.instanceOf(Date).isRequired,
  handleDateSelected: PropTypes.func.isRequired,
  selectedCompany: PropTypes.object.isRequired,
  handleCompanySelected: PropTypes.func.isRequired,
  companies: PropTypes.arrayOf(PropTypes.object).isRequired,
  selectedType: PropTypes.bool.isRequired,
  handleDisplayTypeChanged: PropTypes.func.isRequired,
};
export default ConfigurationBar;
