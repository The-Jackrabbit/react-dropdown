import React from 'react';
import PropTypes from 'prop-types';

let propTypes = {
	onClick: PropTypes.func,
	value: PropTypes.string,
	label: PropTypes.string,
	selected: PropTypes.bool,
};
let defaultProps = {
	value: '',
	label:  '',
	onClick: undefined,
	selected: false
};

const Option = ({value, label, onClick, selected}) => {
	return (
		<li value={value} 
			key={`option-${label}`} 
			onClick={onClick}
			className={selected ? 'selected': null}
		>
			{label}
		</li>
	);
};

Option.defaultProps = defaultProps;
Option.propTypes = propTypes;

export default Option;
