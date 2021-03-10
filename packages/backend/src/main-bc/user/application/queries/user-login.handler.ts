import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { VOEmail } from '@Shared/common/domain/value-objects/email.vo';
import { VOPlainTextPassword } from '@Shared/common/domain/value-objects/plain-text-password.vo';
import { VOUuid } from '@Shared/common/domain/value-objects/uuid.vo';
import { UserLoginUseCase } from '../use-cases/user-login.usecase';
import { UserLoginQuery } from './user-login.query';
import { UserLoginResult } from './user-login.result';

/**
 * Query handler: Login as user
 */
@QueryHandler(UserLoginQuery)
export class UserLoginHandler implements IQueryHandler<UserLoginQuery> {
	/**
	 * Dependency injection
	 * @param userLoginUseCase Use case
	 */
	constructor(private readonly userLoginUseCase: UserLoginUseCase) {}

	/**
	 * Executes the query
	 * @param query Login as user query
	 * @returns User's id
	 */
	public async execute(query: UserLoginQuery): Promise<UserLoginResult> {
		const userId: VOUuid = await this.userLoginUseCase.execute(
			new VOEmail(query.email),
			new VOPlainTextPassword(query.password)
		);

		return { userId: userId.value };
	}
}
