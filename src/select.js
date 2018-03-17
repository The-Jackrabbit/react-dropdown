import React, { Component } from 'react';
import PropTypes from 'prop-types';
import DropdownCaret from './components/dropdownCaret';
import './select.css';

let propTypes = {
	placeholder: PropTypes.string,
	data: PropTypes.array,
	selected: PropTypes.number
};
let defaultProps = {
	placeholder: 'Select',
	data: [
		{label: 'Virginia', value:'VA'},
		{label: 'Florida', value:'FL'},
		{label: 'Pennsylvania', value:'PA'},
		{label: 'California', value:'CA'},
	]
};

class Select extends Component {
	constructor(props) {
		super(props);

		this.state = {
			selected: null,
			filteredResults: [],

		};

		this.onChange = this.onChange.bind(this);
	}
	componentWillMount() {
		let dataMarkup = [];
		this.props.data.forEach(({label, value}) => {
			dataMarkup.push(
				<li value={value} key={`option-${value}`}>{label}</li>
			);
		});
		dataMarkup = <ul>{dataMarkup}</ul>;
		
		this.setState({
			...this.props,
			filteredResults: dataMarkup,
		});
	}

	onChange(event) {
		let inputText = event.target.value;
		let filteredResults = [];

		this.props.data.forEach(({label, value}) => {
			if (label.length <= inputText.length) {
				if (inputText.toLowerCase().includes(label.toLowerCase())) {
					filteredResults.push(label);
				}
			} else {
				if (label.toLowerCase().includes(inputText.toLowerCase())) {
					filteredResults.push(label);
				}
			}
		});
		this.setState({
			filteredResults: filteredResults,
		});
	}

	render() {
		return (
			<div style={{
				padding: '8pt',
				backgroundColor: 'white',
				width: '320pt',
			}}>
				<div className='select-grid'>
					<div className='select-input'>	
						<input type='text' placeholder={this.props.placeholder} onChange={this.onChange}/>
					</div>
					<div className='select-caret'>
						<DropdownCaret></DropdownCaret>
					</div>
				</div>
				<div className='select-results'>
					{this.state.filteredResults}
				</div>
			</div>
		);
	}
}

Select.defaultProps = defaultProps;
Select.propTypes = propTypes;

export default Select;
