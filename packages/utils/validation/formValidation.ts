/**
 * Name or surname validation
 * @param value Value to validate
 * @returns Is valid
 */
export const nameValidation = (value: string): boolean => {
	const name = value.trim();
	const regex = /^[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.'-]+$/u;

	if (name.length < 1) return false;
	if (!name.match(regex)) return false;

	return true;
};

/**
 * Email validation
 * @param value Value to validate
 * @returns Is valid
 */
export const emailValidation = (value: string): boolean => {
	const email = value.trim();
	const regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

	if (email.length < 6) return false;
	if (!email.match(regex)) return false;

	return true;
};

/**
 * Password validation
 *
 * - Minimum length 6 characters
 * - Character range (ASCII) x21 to x7E
 * @param value Value to validate
 * @returns Is valid
 */
export const passwordValidation = (value: string): boolean => {
	const pass = value.trim();
	const regex = /^[\x21-\x7E]+$/;

	if (pass.length < 6) return false;
	if (!pass.match(regex)) return false;

	return true;
};

/**
 * Spanish phone number validation (without prefix)
 *
 * - Phone numbers starting with 6, 7 or 9
 * - Without spaces: 666777888
 * - With spaces:
 *		- 666 555 444
 *		- 666 55 44 33
 * @param phone Phone number
 * @returns Is valid
 */
export const phoneValidation = (phone: string): boolean => {
	const value = phone.trim();
	const regex = /^(6|7|9)([0-9]{8}|[0-9]{2}\s([0-9]{3}\s[0-9]{3}|[0-9]{2}\s[0-9]{2}\s[0-9]{2}))$/g;

	if (!value.match(regex)) return false;

	return true;
};

export const cifOrNifValidation = (cifOrNif: string): boolean => {
	// TODO: Implement

	return !!cifOrNif;
};

export const companyNameValidation = (companyName: string): boolean => {
	// TODO: Implement

	return !!companyName;
};
