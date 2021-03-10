import { PrimitiveValueObject } from '@Shared/common/domain/classes/value-objects/primitive-value-object.class';

/**
 * Web url value object
 */
export class VOWebUrl extends PrimitiveValueObject<string> {
	/**
	 * Validate if a string is a website
	 * @param value Web url
	 */
	protected validate(value: string) {
		// TODO: Esta basura no es capaz de pillar una web sin http
		try {
			new URL(value);
			return true;
		} catch {
			return false;
		}
	}
}
