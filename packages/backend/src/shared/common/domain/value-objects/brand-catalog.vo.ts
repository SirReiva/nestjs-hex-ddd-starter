import { EnumValueObject } from '@Shared/common/domain/classes/value-objects/enum-value-object.class';
import { BrandCatalogs } from '../enums/brand-catalogs.enum';

/**
 * Brand catalog value object
 */
export class VOBrandCatalog extends EnumValueObject<BrandCatalogs> {
	/**
	 * Creates a new Brand catalog value object
	 * @param value current value
	 */
	constructor(value: BrandCatalogs) {
		super(value, Object.values(BrandCatalogs));
	}
}
