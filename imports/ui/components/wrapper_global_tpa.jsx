import React from 'react';
import Select from 'react-select';
import ChartGlobalTPA from './chart_global_tpa.jsx';

const listYears = [
  { value: 2017, label: 2017 },
  { value: 2018, label: 2018 },
];

class WrapperGlobalTPA extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      yearSelected: new Date().getFullYear(),
    };
    this.handleYearSelected = this.handleYearSelected.bind(this);
  }

  handleYearSelected(selectedOption) {
    this.setState({ yearSelected: selectedOption.value });
  }

  render() {
    return (
      <div>
        <Select
          name="year selected"
          value={this.state.yearSelected}
          onChange={this.handleYearSelected}
          options={listYears}
          clearable={false}
        />
        <ChartGlobalTPA yearSelected={this.state.yearSelected} options={this.props.options} />
      </div>
    );
  }
}

export default WrapperGlobalTPA;
