import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { VOUuid } from '@Shared/common/domain/value-objects/uuid.vo';
import { UserFindOneUseCase } from '../use-cases/user-find-one.usecase';
import { UserFindOneQuery } from './user-find-one.query';
import { UserFindOneResult } from './user-find-one.result';
import { UserFound } from './user-find.result';

/**
 * Query handler: Find a user
 */
@QueryHandler(UserFindOneQuery)
export class UserFindOneHandler implements IQueryHandler<UserFindOneQuery> {
	/**
	 * Dependency injection
	 * @param userFindOneUseCase Use case
	 */
	constructor(private readonly userFindOneUseCase: UserFindOneUseCase) {}

	/**
	 * Executes the query
	 * @param query Find users query
	 * @returns User
	 */
	public async execute(query: UserFindOneQuery): Promise<UserFindOneResult> {
		const user = await this.userFindOneUseCase.execute(
			new VOUuid(query.authorId),
			new VOUuid(query.userId)
		);

		return new UserFound(
			user.userId.value,
			user.email.value,
			user.name.value,
			user.surname.value,
			user.role.value
		);
	}
}
