import { Field, InputType } from '@nestjs/graphql';
import { UserRoles } from '@Shared/common/domain/enums/user-roles.enum';

/**
 * Graphql input type: Updates user
 */
@InputType()
export class UserUpdateDto {
	/** User's email */
	@Field({ nullable: true })
	email?: string;
	/** User's name */
	@Field({ nullable: true })
	name?: string;
	/** User's surname */
	@Field({ nullable: true })
	surname?: string;
	/** User's password */
	@Field({ nullable: true })
	password: string;
	/** User's role */
	@Field(() => UserRoles, { nullable: true })
	role: UserRoles;
}
