import { phoneValidation } from 'project-utils/validation/formValidation';
import { VOFormatException } from '../exceptions/vo-format.exception';

/**
 * Contact phone value object. Associates a phone with am information
 */
export class VOContactPhone {
	constructor(public readonly phone: string, public readonly info?: string) {
		if (!phoneValidation(phone)) throw new VOFormatException(phone);

		// TODO: Validar esto
		if (info && info.length > 50) throw new VOFormatException(info);
	}
}
