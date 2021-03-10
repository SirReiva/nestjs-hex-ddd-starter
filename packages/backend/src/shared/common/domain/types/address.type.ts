import { Provinces } from '@Shared/common/domain/enums/provinces.enum';

/** Address */
export type Address = {
	/** Address line 1 */
	line1?: string;
	/** Address line 2 */
	line2?: string;
	/** Town */
	town?: string;
	/** Province */
	province: Provinces;
	/** ZIP code */
	zipCode?: number;
	/** Latitude */
	latitude?: number;
	/** Longitude */
	longitude?: number;
	/** Additional info */
	observations?: string;
};
