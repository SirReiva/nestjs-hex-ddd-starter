import { ObjectType } from '@nestjs/graphql';

/**
 * Graphql type: Contact phone
 */
@ObjectType()
export class ContactPhoneGql {
	/** Phone number */
	phone: string;
	/** Phone information */
	info?: string;
}
