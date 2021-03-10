import { PrimitiveValueObject } from '@Shared/common/domain/classes/value-objects/primitive-value-object.class';

/**
 * NIF  value object
 */
export class VONif extends PrimitiveValueObject<string> {
	/**
	 * Validate if a string is a NIF
	 * @param value NIF
	 */
	protected validate(value: string) {
		// TODO: Validation
		return !!value.length;
	}
}
