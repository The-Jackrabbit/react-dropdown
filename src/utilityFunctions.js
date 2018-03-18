const compare = function(option1, option2) {
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
};

export { compare };