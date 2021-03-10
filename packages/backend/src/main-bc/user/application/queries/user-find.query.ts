import { IQuery } from '@nestjs/cqrs';

/**
 * Query: Find all users
 */
export class UserFindQuery implements IQuery {
	/**
	 * Query fields
	 * @param authorId Author's id
	 */
	constructor(public readonly authorId: string) {}
}
