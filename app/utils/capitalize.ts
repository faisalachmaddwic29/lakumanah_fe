const capitalize = (string: string) => {
	const text = string.toLowerCase();
	return text.charAt(0).toUpperCase() + text.slice(1);
};

const nameTitleCase = (str: string) => {
	return str
		.replace(/_/g, ' ') // ganti underscore jadi spasi
		.replace(/\b\w/g, char => char.toUpperCase()); // kapital huruf pertama tiap kata
}

export { capitalize, nameTitleCase };