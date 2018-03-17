import React from 'react';
import PropTypes from 'prop-types';

let propTypes = {
	height: PropTypes.string,
	width: PropTypes.string,
	fill: PropTypes.string,
};
let defaultProps = {
	height: '8pt',
	width:  '16pt',
	fill: '#D8D8D8',
};

const DropdownCaret = ({height, width, fill}) => {
	return (
		<svg width={width} height={height} viewBox='0 0 200 103' version='1.1' xmlns='http://www.w3.org/2000/svg' xlink='http://www.w3.org/1999/xlink'>
			<g id='Page-1' stroke='none' strokeWidth='1' fill='none' fillRule='evenodd'>
				<g id='Icons' transform='translate(-65.000000, -609.000000)' fill={fill}>
					<g id='DropdownCaret' transform='translate(65.000000, 609.000000)'>
						<polygon id='Triangle-2' transform='translate(100.000000, 51.500000) scale(1, -1) translate(-100.000000, -51.500000) ' points='100 0 200 103 0 103'></polygon>
					</g>
				</g>
			</g>
		</svg>
	);
};

DropdownCaret.defaultProps = defaultProps;
DropdownCaret.propTypes = propTypes;

export default DropdownCaret;
