import React, { Component } from 'react';
import PropTypes from 'prop-types';
import DropdownCaret from './components/dropdownCaret';
import Option from './components/option';
import './select.css';

let propTypes = {
	placeholder: PropTypes.string,
	data: PropTypes.array,
	selected: PropTypes.string,
	testing: PropTypes.bool,
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
	],
	testing: false,
};

class Select extends Component {
	constructor(props) {
		super(props);

		this.state = {
			data: [],
			// Dom/event state
			optionsVisible: false,
			currentlyEngaged: false,
			// Stored values
			value: '',
			highlightedOption: {
				value: undefined,
				label: undefined,
			},
			highlightedIndex: 0,
			selectedOption: {
				value: undefined,
				label: undefined,
			},
			resultLength: 0,
			
		};

		this.changeText = this.changeText.bind(this);
		this.clickOption = this.clickOption.bind(this);

		this.handleTextMouseDown = this.handleTextMouseDown.bind(this);
		this.handleTextBlur = this.handleTextBlur.bind(this);
		this.handleOptionsMouseOver = this.handleOptionsMouseOver.bind(this);
		this.handleOptionsMouseOut = this.handleOptionsMouseOut.bind(this);
		this.handleKeyPress = this.handleKeyPress.bind(this);
		this.handleArrowKey = this.handleArrowKey.bind(this);
		this.handleEnterKey = this.handleEnterKey.bind(this);
		this.handleOptionHover = this.handleOptionHover.bind(this);

	}
	// Lifecycle Hooks
	componentWillMount() {
		let data = [];
		this.props.data.map((element, index) => {
			element.isVisible = true;
			element.isHovered = this.props.selected.value === element.value;
			element.index = index;
			data.push(element);
		});

		this.setState({
			...this.props,
			resultLength: data.length,
			data: data,
		});
	}
	
	// Business Logic
	getFirstMatchOnType(inputText) {
		let matchingResult;
		
		for (let i = 0 ; i < this.state.data.length; i++) {
			let label = this.state.data[i].label;
			let match = this.wordsMatch(inputText.toLowerCase(), label.toLowerCase());

			if (match) {
				matchingResult = this.state.data[i];
				break;
			}
		}

		if (this.matchingResult) {
			this.setState({
				selected: {...matchingResult}, 
			});
		}
		
		return matchingResult;
	}

	updateResults(newSelectedValue, inputText) {
		let data = this.state.data;
		let resultLength = 0;
		data.map((element, i) => {
			let {label, value, isVisible, isHovered, index} = element;
			let match = true;

			if (inputText) {
				match = this.wordsMatch(inputText.toLowerCase(), label.toLowerCase()) 
						|| this.wordsMatch(inputText.toLowerCase(), value.toLowerCase());
			}
			
			element.isHovered = (this.state.highlightedIndex === index);
			element.isVisible = match;
			resultLength += 1*match;
		});
		this.setState({
			data: data,
			resultLength: resultLength,
		});
	}

	// Utility Functions
	wordsMatch(inputText, optionLabel, optionValue) {
		let match = false;

		match = optionLabel.includes(inputText)||optionLabel.includes(inputText);

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

	// Event Functions
	clickOption(label, value) {
		let newlyFilteredResults = this.updateResults(value);

		this.setState({
			value: value,
			selectedOption: {
				label: label,
				value: value,
			},
			optionsVisible: false,
			overOptions: false,
		});
	}

	changeText(event) {
		let inputText = event.target.value;

		this.setState({
			value: inputText,
		});

		let firstMatchingValue = this.getFirstMatchOnType(inputText);
		this.updateResults(firstMatchingValue, inputText);
	}

	// Keyboard Input 
	handleKeyPress(event) {
		if (event.key === 'Enter' && this.state.optionsVisible) {
			this.handleEnterKey();
		}
		if (event.key === 'ArrowUp' && this.state.optionsVisible) {
			this.handleArrowKey('up');
		}
		if (event.key === 'ArrowDown' && this.state.optionsVisible) {
			this.handleArrowKey('down');
		}
	}

	handleArrowKey(direction) {
		let offset = (direction === 'up') ? -1: 1;
		let newIndex = (this.state.highlightedIndex + offset)%this.state.resultLength;
		this.setState({
			highlightedIndex: newIndex,
		});
		this.updateResults(this.state.selectedOption);
	}

	handleEnterKey() {
		this.setState({
			value: this.state.data[this.state.highlightedIndex].label,
			selected: this.state.highlightedOption.value,
			optionsVisible: false,
			currentlyEngaged: false,
		});
		this.updateResults(this.state.data[this.state.highlightedIndex].value);
	}

	handleTextMouseDown() {
		this.setState({
			optionsVisible: true,
			currentlyEngaged: true,
		});
	}

	handleTextBlur() {
		this.setState({
			optionsVisible: this.state.overOptions&&this.state.currentlyEngaged,
		});
	}

	handleOptionsMouseOver() {
		this.setState({
			overOptions: true,
		});
	}

	handleOptionsMouseOut() {
		this.setState({
			overOptions: false,
		});
	}

	handleOptionHover(index) {
		this.setState({
			highlightedIndex: index,
		});	
	}

	render() {
		return (
			<div style={{
				backgroundColor: 'white',
				width: '320pt',
			}}
			onBlur={this.handleTextBlur}
			onKeyUp={this.handleKeyPress}>
				<div className='select-grid'>
					<div className='select-input'>	
						<input 
							type='text' 
							value={this.state.value}
							placeholder={this.props.placeholder} 
							onChange={this.changeText} 
							onMouseDown={this.handleTextMouseDown}
						/>
					</div>
					<div className='select-caret'>
						<DropdownCaret></DropdownCaret>
					</div>
				</div>
				<div className='select-results'
					onMouseOver={this.handleOptionsMouseOver}
					onMouseOut={this.handleOptionsMouseOut}>
					
					{
						this.state.optionsVisible && 
						this.state.data.map(({value, label, isHovered, isVisible}, index) => 
							<Option 
								value={value} 
								key={value} 
								label={label} 
								index={index}
								isHovered={this.state.highlightedIndex === index} 
								isVisible={isVisible}
								onClick={this.clickOption}
								onMouseEnter={this.handleOptionHover}>
							</Option>
						)
					}
				</div>
			</div>
		);
	}
}

Select.defaultProps = defaultProps;
Select.propTypes = propTypes;

export default Select;
