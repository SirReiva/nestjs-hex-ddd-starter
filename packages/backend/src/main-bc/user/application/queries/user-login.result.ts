import { IQueryResult } from '@nestjs/cqrs';

/**
 * Query result: Login as user
 */
export class UserLoginResult implements IQueryResult {
	/**
	 * Result fields
	 * @param userId User's id
	 */
	constructor(public readonly userId: string) {}
}
