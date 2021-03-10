import { Field, InputType } from '@nestjs/graphql';
import { Provinces } from '@Shared/common/domain/enums/provinces.enum';
/**
 * Graphql input type: Address
 */
@InputType()
export class AddressDto {
	/** Address line 1 */
	@Field()
	line1?: string;
	/** Address line 2 */
	@Field()
	line2?: string;
	/** Town */
	@Field()
	town?: string;
	/** Province */
	@Field(() => Provinces)
	province: Provinces;
	/** ZIP code */
	@Field()
	zipCode?: number;
	/** Latitude */
	@Field()
	latitude?: number;
	/** Longitude */
	@Field()
	longitude?: number;
	/** Additional info */
	@Field()
	observations?: string;
}
