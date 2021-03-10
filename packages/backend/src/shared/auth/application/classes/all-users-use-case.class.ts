import { QueryBus } from '@nestjs/cqrs';
import { AuthUserNotFoundException } from '@Shared/auth/application/exceptions/auth-user-not-found.exception';
import { UnauthorizedUserException } from '@Shared/auth/application/exceptions/unauthorized-user.exception';
import { GetAuthUserRoleQuery } from '@Shared/auth/application/queries/get-auth-user-role.query';
import { IUseCase } from '@Shared/common/application/interfaces/use-case.interface';
import { VOUuid } from '@Shared/common/domain/value-objects/uuid.vo';

/**
 * Abstract class for all users use cases
 */
export abstract class AllUsersUseCase implements IUseCase {
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
	 * Check if author is authorized and throws unauthorized exception if not.
	 * @param authorId Author's id
	 */
	async isAuthorAllowed(authorId: VOUuid): Promise<void> {
		try {
			await this.queryBus.execute(new GetAuthUserRoleQuery(authorId.value));
		} catch (exception) {
			if (exception instanceof AuthUserNotFoundException)
				throw new UnauthorizedUserException();

			throw exception;
		}
	}
}
