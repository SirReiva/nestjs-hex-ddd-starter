import { PrimitiveValueObject } from '@Shared/common/domain/classes/value-objects/primitive-value-object.class';
import { phoneValidation } from 'project-utils/validation/formValidation';

/**
 * Phone value object
 */
export class VOPhone extends PrimitiveValueObject<string> {
	/**
	 * Validate if a string is a phone number
	 * @param value Phone
	 */
	protected validate(value: string) {
		// TODO: Revisar esto
		return phoneValidation(value);
	}
}
