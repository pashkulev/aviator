export default {
	trim: (formObject) => {
		let trimmedObject = {};
		for (let key of Object.keys(formObject)) {
			if (typeof formObject[key] === 'string') {
				trimmedObject[key] = formObject[key].trim();
			} else {
				trimmedObject[key] = formObject[key];
			}
		}

		return trimmedObject;
	}
}