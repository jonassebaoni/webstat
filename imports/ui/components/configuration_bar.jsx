import React from 'react';
import Select from 'react-select';
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
  },
};

class ConfigurationBar extends React.PureComponent {
  render() {
    const companies = this.props.companies.map(company =>
      ({ value: company._id, label: company.name }));

    return (
      <section id="configurationBar">
        <DateRange style={styles.dataRangeIcon} />
        <DatePicker
          id="time"
          value={this.props.selectedDate}
          onChange={this.props.handleDateSelected}
          style={styles.datePicker}
        />
        <Select
          name="Company selected"
          value={this.props.selectedCompany}
          onChange={this.props.handleCompanySelected}
          options={companies}
          clearable={false}
        />
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
};
export default ConfigurationBar;
