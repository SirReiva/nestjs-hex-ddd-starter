import { Provinces } from '@Shared/common/domain/enums/provinces.enum';
import { AutonomousCommunities } from '../enums/autonomous-communities.enum';

/** Address with community */
export type FullAddress = {
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
