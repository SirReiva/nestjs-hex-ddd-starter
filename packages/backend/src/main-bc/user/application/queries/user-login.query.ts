import { IQuery } from '@nestjs/cqrs';

/**
 * Query: Login as user
 */
export class UserLoginQuery implements IQuery {
	/**
	 * Query fields
	 * @param email User's email
	 * @param password User's password
	 */
	constructor(
		public readonly email: string,
		public readonly password: string
	) {}
}
