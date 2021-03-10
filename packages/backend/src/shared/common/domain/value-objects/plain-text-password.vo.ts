import { PrimitiveValueObject } from '@Shared/common/domain/classes/value-objects/primitive-value-object.class';

/**
 * Plain text password value object
 */
export class VOPlainTextPassword extends PrimitiveValueObject<string> {
	/**
	 * No needs to validate
	 */
	protected validate() {
		return true;
	}
}
