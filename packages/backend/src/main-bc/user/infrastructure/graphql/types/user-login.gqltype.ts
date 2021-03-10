import { Field, ID, ObjectType } from '@nestjs/graphql';
import { User } from './user.gqltype';

/**
 * Graphql type: User login response
 */
@ObjectType()
export class UserLogin {
	/** JWT token */
	@Field(() => ID)
	token: string;
	/** User's data */
	user: User;
}
