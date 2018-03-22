import React from 'react';
import PropTypes from 'prop-types';

let propTypes = {
	onClick: PropTypes.func,
	onMouseEnter: PropTypes.func,
	value: PropTypes.string,
	label: PropTypes.string,
	isHovered: PropTypes.bool,
	isVisible: PropTypes.bool,
	index: PropTypes.number,
};

let defaultProps = {
	onClick: undefined,
	onMouseEnter: undefined,
	value: '',
	label:  '',
	isHovered: false,
	isVisible: true,
	index: 0,
};

const Option = ({onClick, onMouseEnter, value, label, isHovered, isVisible, index}) => {
	let handleMouseEnter = () => {
		onMouseEnter(index);
	};
	let handleClick= () => {
		onClick(value, label, index);
	};
	return (
		isVisible && 
		<li value={value} onClick={handleClick} onMouseEnter={handleMouseEnter} className={isHovered ? 'selected': null}>
			{label}
		</li>
	);
};

Option.defaultProps = defaultProps;
Option.propTypes = propTypes;

export default Option;
