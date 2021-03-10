import { PrimitiveValueObject } from '@Shared/common/domain/classes/value-objects/primitive-value-object.class';
import { test as uuidTest } from 'uuid-random';

/**
 * Uuid value object
 */
export class VOUuid extends PrimitiveValueObject<string> {
	/**
	 * Creates a new UUID value object
	 * @param value Uuid
	 */
	protected validate(value: string) {
		return uuidTest(value);
	}
}
