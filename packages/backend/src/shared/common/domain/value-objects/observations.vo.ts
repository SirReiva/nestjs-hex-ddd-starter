import { PrimitiveValueObject } from '@Shared/common/domain/classes/value-objects/primitive-value-object.class';

/**
 * Observations value object
 */
export class VOObservations extends PrimitiveValueObject<string> {
	/**
	 * Validate if a string is an observations string
	 * @param value Observations
	 */
	protected validate(value: string): boolean {
		// TODO: Validation
		return !!value.length;
	}
}
