import { UserModel } from '@Main-bc/user/domain/models/user.model';
import { InjectUserRepository } from '@Main-bc/user/domain/repository/user-repository.ditoken';
import { IUserRepository } from '@Main-bc/user/domain/repository/user-repository.interface';
import { Injectable } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { AllUsersUseCase } from '@Shared/auth/application/classes/all-users-use-case.class';
import { VOUuid } from '@Shared/common/domain/value-objects/uuid.vo';

/**
 * Use case: Find one users
 */
@Injectable()
export class UserFindOneUseCase extends AllUsersUseCase {
	/**
	 * Dependency injection
	 * @param userRepository User repository
	 * @param queryBus Query bus
	 */
	constructor(
		@InjectUserRepository()
		private readonly userRepository: IUserRepository,
		protected readonly queryBus: QueryBus
	) {
		super(queryBus);
	}

	/**
	 * Finds one existing user
	 * @param authorId Author's id
	 * @param userId User's userId
	 */
	async execute(authorId: VOUuid, userId: VOUuid): Promise<UserModel> {
		await this.isAuthorAllowed(authorId);

		return await this.userRepository.findById(userId);
	}
}
