import { IQueryResult } from '@nestjs/cqrs';
import { UserRoles } from '@Shared/common/domain/enums/user-roles.enum';

/**
 * Query result: Get user role
 */
export class GetAuthUserRoleResult implements IQueryResult {
	/**
	 * Result fields
	 * @param role User's role
	 */
	constructor(public readonly role: UserRoles) {}
}
