import { PrimitiveValueObject } from '@Shared/common/domain/classes/value-objects/primitive-value-object.class';

/**
 * Intracommunity NIF value object
 */
export class VONifInt extends PrimitiveValueObject<string> {
	/**
	 * Validate if a string is an intracommunity NIF
	 * @param value NIF
	 */
	protected validate(value: string) {
		// TODO: Validation
		return !!value.length;
	}
}
