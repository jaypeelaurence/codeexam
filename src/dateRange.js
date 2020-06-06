const dateRange = date => {
	const current = new Date(date);
	const weekstart = current.getDate() - current.getDay() + 1;    
	const weekend = weekstart + 6;
	const monday = new Date(current.setDate(weekstart));  
	const sunday = new Date(current.setDate(weekend));

	return [monday, sunday];
}

module.exports = dateRange;