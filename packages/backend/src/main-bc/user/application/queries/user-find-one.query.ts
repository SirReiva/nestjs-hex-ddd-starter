import { IQuery } from '@nestjs/cqrs';

/**
 * Query: Find a users
 */
export class UserFindOneQuery implements IQuery {
	/**
	 * Query fields
	 * @param authorId Author's id
	 * @param userId User's id
	 */
	constructor(
		public readonly authorId: string,
		public readonly userId: string
	) {}
}
