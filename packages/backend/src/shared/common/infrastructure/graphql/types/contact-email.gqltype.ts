import { ObjectType } from '@nestjs/graphql';

/**
 * Graphql type: Contact email
 */
@ObjectType()
export class ContactEmailGql {
	/** Email address */
	email: string;
	/** Email information */
	info?: string;
}
