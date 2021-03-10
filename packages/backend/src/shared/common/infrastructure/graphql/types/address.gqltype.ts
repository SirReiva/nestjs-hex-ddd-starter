import { ObjectType } from '@nestjs/graphql';
import { AutonomousCommunities } from '@Shared/common/domain/enums/autonomous-communities.enum';
import { Provinces } from '@Shared/common/domain/enums/provinces.enum';

/**
 * Graphql type: Address
 */
@ObjectType()
export class AddressGql {
	/** Address line 1 */
	line1?: string;
	/** Address line 2 */
	line2?: string;
	/** Province */
	province: Provinces;
	/** Autonomous community */
	community: AutonomousCommunities;
	/** Town */
	town?: string;
	/** ZIP code */
	zipCode?: number;
	/** Latitude */
	latitude?: number;
	/** Longitude */
	longitude?: number;
	/** Additional info */
	observations?: string;
}
