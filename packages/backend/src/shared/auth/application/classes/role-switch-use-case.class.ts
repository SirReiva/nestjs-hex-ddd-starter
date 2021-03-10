import { QueryBus } from '@nestjs/cqrs';
import { AuthUserNotFoundException } from '@Shared/auth/application/exceptions/auth-user-not-found.exception';
import { UnauthorizedUserException } from '@Shared/auth/application/exceptions/unauthorized-user.exception';
import { GetAuthUserRoleQuery } from '@Shared/auth/application/queries/get-auth-user-role.query';
import { IUseCase } from '@Shared/common/application/interfaces/use-case.interface';
import { VOUserRole } from '@Shared/common/domain/value-objects/user-role.vo';
import { VOUuid } from '@Shared/common/domain/value-objects/uuid.vo';
import { GetAuthUserRoleResult } from '../queries/get-auth-user-role.result';

/**
 * Abstract class for role-switch use cases
 */
export abstract class RoleSwitchUseCase implements IUseCase {
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
	 * Gets user role, or throws unauthorized exception
	 * @param authorId Author's id
	 * @returns User role
	 */
	async getAuthorRole(authorId: VOUuid): Promise<VOUserRole> {
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

		return new VOUserRole(authorRole.role);
	}
}
