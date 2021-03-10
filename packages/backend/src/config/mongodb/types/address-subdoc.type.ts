import { AutonomousCommunities } from '@Shared/common/domain/enums/autonomous-communities.enum';
import { Provinces } from '@Shared/common/domain/enums/provinces.enum';

/** Address mongoose subdocument */
export type AddressSubDoc = {
	/** Address line 1 */
	line1?: string;
	/** Address line 2 */
	line2?: string;
	/** Town */
	town?: string;
	/** Province */
	province: Provinces;
	/** Autonomous community */
	community: AutonomousCommunities;
	/** ZIP code */
	zipCode?: number;
	/** Latitude */
	latitude?: number;
	/** Longitude */
	longitude?: number;
	/** Additional info */
	observations?: string;
};
