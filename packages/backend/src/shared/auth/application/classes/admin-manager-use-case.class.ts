import { QueryBus } from '@nestjs/cqrs';
import { AuthUserNotFoundException } from '@Shared/auth/application/exceptions/auth-user-not-found.exception';
import { ForbiddenRoleException } from '@Shared/auth/application/exceptions/forbidden-role.exception';
import { UnauthorizedUserException } from '@Shared/auth/application/exceptions/unauthorized-user.exception';
import { GetAuthUserRoleQuery } from '@Shared/auth/application/queries/get-auth-user-role.query';
import { IUseCase } from '@Shared/common/application/interfaces/use-case.interface';
import { UserRoles } from '@Shared/common/domain/enums/user-roles.enum';
import { VOUuid } from '@Shared/common/domain/value-objects/uuid.vo';
import { GetAuthUserRoleResult } from '../queries/get-auth-user-role.result';

/**
 * Abstract class for role-based admin or admin-manager use cases
 */
export abstract class AdminManagerUseCase implements IUseCase {
	/**
	 * Dependency injection
	 * @param queryBus Query bus
	 */
	constructor(protected readonly queryBus: QueryBus) {}

	/**
	 * Executes the use case
	 * @param args Use case arguments
	 */
	abstract execute(...args: any[]): any;

	/**
	 * Check if author is an admin or admin-manager and throws unauthorized/forbidden exception if not.
	 * @param authorId Author's id
	 */
	async isAuthorAllowed(authorId: VOUuid): Promise<void> {
		let authorRole: GetAuthUserRoleResult;

		try {
			authorRole = await this.queryBus.execute(
				new GetAuthUserRoleQuery(authorId.value)
			);
		} catch (exception) {
			if (exception instanceof AuthUserNotFoundException)
				throw new UnauthorizedUserException();

			throw exception;
		}

		if (
			authorRole.role !== UserRoles.ADMIN &&
			authorRole.role !== UserRoles.ADMIN_MANAGER
		)
			throw new ForbiddenRoleException();
	}
}
