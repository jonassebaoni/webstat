import React from 'react';
import Select from 'react-select';
import DatePicker from 'material-ui/DatePicker';
import Slider from 'rc-slider';
import RaisedButton from 'material-ui/RaisedButton';
import ChartTPD from './chart_tpd.jsx';

const createSliderWithTooltip = Slider.createSliderWithTooltip;
const Range = createSliderWithTooltip(Slider.Range);
let rangeSelected = [];

class WrapperTPD extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            query: '',
            options: [],
            controlledDate: new Date(),
            rangeValue: [6,20],
        };
        this.handleCompanySelected = this.handleCompanySelected.bind(this);
        this.handleDateSelected = this.handleDateSelected.bind(this);
        this.handleRangeSelected = this.handleRangeSelected.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentWillMount() {
        //on recupere les entreprises depuis le parent et on l'injecte dans le state
        const options = [];
        this.props.options.map((company) => {
            options.push({value: company._id, label: company.name})
        });
        this.setState({
            options,
            query: options[0].value, // valeur par defaut (Sudri'Cub)
        });
    }

    componentDidMount() {
        require('react-select/dist/react-select.css');
        require('rc-slider/assets/index.css');
    }

    handleCompanySelected(selectedOption) {
        this.setState({ query: selectedOption.value });
    }

    handleDateSelected(event, date) {
        console.log(date);
        this.setState({
            controlledDate: date
        });
    };

    handleRangeSelected(value) {
        rangeSelected = value;
    };

    handleSubmit(e) {
        e.preventDefault();
        this.setState({rangeValue: rangeSelected});
    };

    render() {
        return (
            <div>
                <div style={{display: 'flex', flexDirection: 'row'}}>
                    <DatePicker
                        hintText="Date Input"
                        value={this.state.controlledDate}
                        onChange={this.handleDateSelected}
                        style={{marginLeft:"60px", margiBottom:"10px", marginTop:"10px"}}
                    />
                    <Select
                        name="year selected"
                        value={this.state.query}
                        onChange={this.handleCompanySelected}
                        options={this.state.options}
                    />
                </div>
                <div style={{display: 'flex', flexDirection: 'row'}}>
                    <Range defaultValue={this.state.rangeValue}
                           allowCross={false}
                           style={{width:"350px", marginLeft:"80px", marginBottom: "15px", marginTop:"10px"}}
                           max={23}
                           onChange={this.handleRangeSelected}
                           tipFormatter={(value) => {return value + "h";}}
                    />
                    <RaisedButton
                        label={"Submit"} primary={true}
                        style={{marginLeft: "25px", marginBottom: "15px"}}
                        onClick={this.handleSubmit}/>
                </div>
                <ChartTPD filter={this.state.query} date={this.state.controlledDate} range={this.state.rangeValue}/>
            </div>
        );
    }
}
export default WrapperTPD;
