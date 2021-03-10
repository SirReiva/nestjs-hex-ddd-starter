import { PrimitiveValueObject } from '@Shared/common/domain/classes/value-objects/primitive-value-object.class';
import { emailValidation } from 'project-utils/validation/formValidation';

/**
 * Email value object
 */
export class VOEmail extends PrimitiveValueObject<string> {
	/**
	 * Creates a email value object
	 * @param value Email
	 */
	constructor(value: string) {
		super(value.toLowerCase());
	}
	/**
	 * Validate if a string is an email
	 * @param value Email
	 */
	protected validate(value: string) {
		return emailValidation(value);
	}
}
