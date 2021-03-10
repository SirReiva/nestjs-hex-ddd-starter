import { Field, InputType } from '@nestjs/graphql';

/**
 * Grpahql input type: User login
 */
@InputType()
export class UserLoginDto {
	/** User's email */
	@Field()
	email: string;
	/** User's password */
	@Field()
	password: string;
}
