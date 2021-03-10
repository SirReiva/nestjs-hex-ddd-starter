import { Field, ID, ObjectType } from '@nestjs/graphql';
import { UserRoles } from '@Shared/common/domain/enums/user-roles.enum';

/**
 * Graphql type: User
 */
@ObjectType()
export class User {
	/** User's id */
	@Field(() => ID)
	userId: string;
	/** User's email */
	email: string;
	/** User's name */
	name: string;
	/** User's surname */
	surname: string;
	/** User's role on the platform */
	role: UserRoles;
}
