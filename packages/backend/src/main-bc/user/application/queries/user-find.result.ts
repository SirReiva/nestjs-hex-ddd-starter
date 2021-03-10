import { IQueryResult } from '@nestjs/cqrs';
import { UserRoles } from '@Shared/common/domain/enums/user-roles.enum';

/**
 * Users found
 */
export class UserFound {
	/**
	 * User's fields
	 * @param userId User's id
	 * @param email User's email
	 * @param name User's name
	 * @param surname User's surname
	 * @param role User's role
	 */
	constructor(
		public readonly userId: string,
		public readonly email: string,
		public readonly name: string,
		public readonly surname: string,
		public readonly role: UserRoles
	) {}
}

/**
 * Query result: Find all users
 */
export class UserFindResult implements IQueryResult {
	/**
	 * Result fields
	 * @param users Users array
	 */
	constructor(public readonly users: UserFound[]) {}
}
