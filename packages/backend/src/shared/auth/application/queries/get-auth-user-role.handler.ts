import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { VOUuid } from '@Shared/common/domain/value-objects/uuid.vo';
import { GetUserRoleUseCase } from '../use-cases/get-user-role.usecase';
import { GetAuthUserRoleResult } from './get-auth-user-role.result';
import { GetAuthUserRoleQuery } from './get-auth-user-role.query';

/**
 * Query handler: Get user role
 */
@QueryHandler(GetAuthUserRoleQuery)
export class GetAuthUserRoleHandler
	implements IQueryHandler<GetAuthUserRoleQuery> {
	/**
	 * Dependency injection
	 * @param getUserRoleUseCase Use case
	 */
	constructor(private readonly getUserRoleUseCase: GetUserRoleUseCase) {}

	/**
	 * Executes the query
	 * @param query Login as user query
	 * @returns User's role
	 */
	async execute(query: GetAuthUserRoleQuery): Promise<GetAuthUserRoleResult> {
		const role = await this.getUserRoleUseCase.execute(
			new VOUuid(query.userId)
		);

		return { role: role.value };
	}
}
