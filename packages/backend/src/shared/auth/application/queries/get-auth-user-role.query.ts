import { IQuery } from '@nestjs/cqrs';

/**
 * Query: Get user role
 */
export class GetAuthUserRoleQuery implements IQuery {
	/**
	 * Query fields
	 * @param userId User's id
	 */
	constructor(public readonly userId: string) {}
}
