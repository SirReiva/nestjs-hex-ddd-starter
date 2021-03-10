import { Field, InputType } from '@nestjs/graphql';

/**
 * Graphql input type: Contact phone
 */
@InputType()
export class ContactPhoneDto {
	/** Phone number */
	@Field()
	phone: string;
	/** Phone information */
	@Field()
	info?: string;
}
