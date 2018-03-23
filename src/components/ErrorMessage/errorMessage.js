import React from 'react';
import './errorMessage.css';
import PropTypes from 'prop-types';

let propTypes = {
	errorMessage: PropTypes.string
};

const ErrorMessage = ({errorMessage}) => {
	return (
		<div className='error'>
			<p>{errorMessage}</p>
		</div>
	);
};

ErrorMessage.propTypes = propTypes;
export default ErrorMessage;