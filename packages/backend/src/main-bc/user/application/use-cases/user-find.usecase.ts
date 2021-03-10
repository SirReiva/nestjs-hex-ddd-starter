import { UserModel } from '@Main-bc/user/domain/models/user.model';
import { InjectUserRepository } from '@Main-bc/user/domain/repository/user-repository.ditoken';
import { IUserRepository } from '@Main-bc/user/domain/repository/user-repository.interface';
import { Injectable } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { AdminUseCase } from '@Shared/auth/application/classes/admin-use-case.class';
import { VOUuid } from '@Shared/common/domain/value-objects/uuid.vo';

/**
 * Use case: Find all users
 */
@Injectable()
export class UserFindUseCase extends AdminUseCase {
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
	 * Finds all existing users
	 * @param authorId Author's id
	 */
	async execute(authorId: VOUuid): Promise<UserModel[]> {
		await this.isAuthorAllowed(authorId);

		return await this.userRepository.find();
	}
}
