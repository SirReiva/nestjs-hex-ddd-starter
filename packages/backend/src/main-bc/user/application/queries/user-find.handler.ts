import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { VOUuid } from '@Shared/common/domain/value-objects/uuid.vo';
import { UserFindUseCase } from '../use-cases/user-find.usecase';
import { UserFindQuery } from './user-find.query';
import { UserFindResult, UserFound } from './user-find.result';

/**
 * Query handler: Find users
 */
@QueryHandler(UserFindQuery)
export class UserFindHandler implements IQueryHandler<UserFindQuery> {
	/**
	 * Dependency injection
	 * @param userFindUseCase Use case
	 */
	constructor(private readonly userFindUseCase: UserFindUseCase) {}

	/**
	 * Executes the query
	 * @param query Find users query
	 * @returns Users
	 */
	public async execute(query: UserFindQuery): Promise<UserFindResult> {
		const domainUsers = await this.userFindUseCase.execute(
			new VOUuid(query.authorId)
		);

		return {
			users: domainUsers.map(
				user =>
					new UserFound(
						user.userId.value,
						user.email.value,
						user.name.value,
						user.surname.value,
						user.role.value
					)
			),
		};
	}
}
