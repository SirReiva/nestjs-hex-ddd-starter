import { Field, ID, InputType } from '@nestjs/graphql';
import { UserRoles } from '@Shared/common/domain/enums/user-roles.enum';

/**
 * Graphql input type: Create a new user
 */
@InputType()
export class UserCreateDto {
	/** User's id */
	@Field(() => ID)
	id: string;
	/** User's email */
	@Field()
	email: string;
	/** User's name */
	@Field()
	name: string;
	/** User's surname */
	@Field()
	surname: string;
	/** User's password */
	@Field()
	password: string;
	/** User's role on the platform */
	@Field(() => UserRoles)
	role: UserRoles;
}
