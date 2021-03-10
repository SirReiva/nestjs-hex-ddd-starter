import { emailValidation } from 'project-utils/validation/formValidation';
import { VOFormatException } from '../exceptions/vo-format.exception';

/**
 * Contact email value object. Associates a email with am information
 */
export class VOContactEmail {
	public readonly email: string;

	constructor(_email: string, public readonly info?: string) {
		if (!emailValidation(_email)) throw new VOFormatException(_email);

		this.email = _email.toLowerCase();

		// TODO: Validar esto
		if (info && info.length > 50) throw new VOFormatException(info);
	}
}
