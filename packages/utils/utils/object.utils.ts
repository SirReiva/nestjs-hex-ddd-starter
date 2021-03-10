/**
 * Deletes all undefined or null properties from an object.
 *
 * @param obj Object to clean
 */
export const cleanObject = (obj: any) => {
	for (const property in obj) {
		if (obj[property] === null || obj[property] === undefined) {
			delete obj[property] as any;
		}
	}
};

/**
 * Trims all whitespaces from all string properties of an object.
 *
 * @param obj Object to trim
 */
export const trimAllStrings = (obj: any) => {
	for (const property in obj) {
		if (typeof obj[property] === 'string') {
			obj[property] = obj[property].trim();
		}
	}
};
