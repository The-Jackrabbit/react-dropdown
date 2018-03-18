import React, { Component } from 'react';
import PropTypes from 'prop-types';
import DropdownCaret from './components/dropdownCaret';
import Option from './components/option';
import './select.css';

let propTypes = {
	placeholder: PropTypes.string,
	data: PropTypes.array,
	selected: PropTypes.string
};
let defaultProps = {
	placeholder: 'Select',
	data: [
		{label: 'Virginia', value:'VA'},
		{label: 'Florida', value:'FL'},
		{label: 'Pennsylvania', value:'PA'},
		{label: 'California', value:'CA'},
		{label: 'Oregon', value:'OR'},
		{label: 'Washington', value:'WA'},
		{label: 'Montana', value:'MO'},
		{label: 'Idaho', value:'ID'},
		{label: 'Wyoming', value:'WY'},
		{label: 'Utah', value:'UT'},
	]
};

class Select extends Component {
	constructor(props) {
		super(props);

		this.state = {
			selected: null,
			filteredResults: [],
			filteredResultsMarkup: [],
			value: undefined,
			optionsVisibile: false,
		};

		this.onChange = this.onChange.bind(this);
		this.clickOption = this.clickOption.bind(this);

		this.handleFocus = this.handleFocus.bind(this);
		this.handleBlur = this.handleBlur.bind(this);
	}
	componentWillMount() {
		let markup = [];
		let data = this.props.data;

		data.forEach((element) => {
			element.selected = this.props.selected === element.value;
			markup.push(
				<Option value={element.value} key={element.value} 
					onClick={this.clickOption} 
					label={element.label} selected={element.selected}>
				</Option>
			);
		});

		this.setState({
			...this.props,
			data: data,
			filteredResults: data,
			filteredResultsMarkup: markup,
		});
	}

	clickOption(event) {
		const chosenValue = event.target.getAttribute('value');
		const chosenLabel = event.target.innerHTML;
		this.setState({
			selected: chosenValue,
		});
		let filteredResults = this.state.filteredResults;
		
		let newlyFilteredResults = this.updateFilteredResultsWithClick(chosenValue);
		this.updateResultsMarkup(this.state.filteredResults);

		this.setState({
			value: chosenLabel,
		});
	}

	onChange(event) {
		let inputText = event.target.value;

		let firstMatchingValue = this.getFirstMatchOnType(inputText);
		let newlyFilteredResults = this.updateFilteredResultsWithText(firstMatchingValue, inputText);
		this.updateResultsMarkup(newlyFilteredResults);

		this.setState({
			value: inputText,
		});
	}

	getFirstMatchOnType(value) {
		let inputText = value.toLowerCase();
		let matchingResult = {
			value: null
		};
		let i = 0;
		while (matchingResult.value === null && i < this.state.data.length) {
			let label = this.state.data[i].label.toLowerCase();
			let match = this.wordsMatch(inputText, label);

			if (match) {
				matchingResult = this.state.data[i];
			}
			i++;
		}

		this.setState({
			selected: matchingResult.value
		});

		return matchingResult.value;
	}

	updateFilteredResultsWithClick(newSelectedValue) {
		let filteredResults = [];
		
		this.state.filteredResults.forEach((element) => {
			element.selected = (element.value === newSelectedValue);
			filteredResults.push(element);
		});

		this.setState({
			filteredResults: filteredResults,
		});

		return filteredResults;
	}

	updateFilteredResultsWithText(newSelectedValue, inputText) {
		inputText = inputText.toLowerCase();
		let filteredResults = [];
		
		this.state.data.forEach((element) => {
			let optionLabel = element.label.toLowerCase();
			let match = this.wordsMatch(inputText, optionLabel);

			element.selected = (element.value === newSelectedValue);

			if (match) {
				filteredResults.push(element);
			}
		});

		this.setState({
			filteredResults: filteredResults,
		});

		return filteredResults;
	}

	updateResultsMarkup(newlyFilteredResults) {
		let filteredResultsMarkup = [];
		newlyFilteredResults.forEach(({label, value, selected}) => {
			filteredResultsMarkup.push(
				<Option value={value} key={value} onClick={this.clickOption} label={label} selected={selected}></Option>
			);
		});
		this.setState({
			filteredResultsMarkup: <ul>{filteredResultsMarkup}</ul>,
		});
	}

	// Utility Functions
	wordsMatch(inputText, label) {
		let match = false;

		if (label.length <= inputText.length) {
			match = inputText.includes(label);
		} else {
			match = label.includes(inputText);
		}

		return match;
	}

	compare(option1, option2) {
		// Use toUpperCase() to ignore character casing
		const label1 = option1.label.toUpperCase();
		const label2 = option2.label.toUpperCase();
	 
		let comparison = 0;
		if (label1 > label2) {
		  comparison = 1;
		} else if (label1 < label2) {
		  comparison = -1;
		}
		return comparison;
	}

	handleFocus() {
		this.setState({
			optionsVisibile: true,
		});
	}

	handleBlur() {
		this.setState({
			optionsVisibile: false,
		});
	}

	render() {
		return (
			<div style={{
				backgroundColor: 'white',
				width: '320pt',
			}}
			onBlur={this.handleBlur} >
				<div className='select-grid'>
					<div className='select-input'>	
						<input type='text' placeholder={this.props.placeholder} 
							onChange={this.onChange} value={this.state.value}
							onFocus={this.handleFocus}/>
					</div>
					<div className='select-caret'>
						<DropdownCaret></DropdownCaret>
					</div>
				</div>
				<div className='select-results'>
					
					{this.state.optionsVisibile && this.state.filteredResultsMarkup}
				</div>
			</div>
		);
	}
}

Select.defaultProps = defaultProps;
Select.propTypes = propTypes;

export default Select;
