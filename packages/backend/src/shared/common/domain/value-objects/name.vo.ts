import { PrimitiveValueObject } from '@Shared/common/domain/classes/value-objects/primitive-value-object.class';
import { nameValidation } from 'project-utils/validation/formValidation';

/**
 * Name value object
 */
export class VOName extends PrimitiveValueObject<string> {
	/**
	 * Validate if a string is a name
	 * @param value Name
	 */
	protected validate(value: string) {
		return nameValidation(value);
	}
}
