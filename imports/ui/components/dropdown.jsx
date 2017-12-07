import React from 'react';
import Select from 'react-select';
import 'react-select/dist/react-select.css';

export default class Dropdown extends React.Component {
        state = {
            selectedOption: '',
        }

    handleChange(selectedOption) {
        this.setState({ selectedOption });
        console.log(`id selected: ${selectedOption.label}`);
    }

    render() {
        return (
            <Select
                name="id selected"
                value={this.state.selectedOption}
                onChange={this.handleChange}
                options= {this.props.options}
            />
        );
    }
}
