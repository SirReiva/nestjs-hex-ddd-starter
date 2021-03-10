import { Field, InputType } from '@nestjs/graphql';

/**
 * Graphql input type: Contact email
 */
@InputType()
export class ContactEmailDto {
	/** Email address */
	@Field()
	email: string;
	/** Email information */
	@Field()
	info?: string;
}
