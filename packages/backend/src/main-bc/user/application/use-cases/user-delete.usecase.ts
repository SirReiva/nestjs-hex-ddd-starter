import { UserNotFoundException } from '@Main-bc/user/application/exceptions/user-not-found.exception';
import { InjectUserRepository } from '@Main-bc/user/domain/repository/user-repository.ditoken';
import { IUserRepository } from '@Main-bc/user/domain/repository/user-repository.interface';
import { Injectable } from '@nestjs/common';
import { IEventPublisher, QueryBus } from '@nestjs/cqrs';
import { AdminUseCase } from '@Shared/auth/application/classes/admin-use-case.class';
import { VOUuid } from '@Shared/common/domain/value-objects/uuid.vo';
import { InjectEventPublisher } from '@Shared/common/infrastructure/decorators/event-publisher.ditoken';

/**
 * Use case: Delete a user
 */
@Injectable()
export class UserDeleteUseCase extends AdminUseCase {
	/**
	 * Dependency injection
	 * @param userRepository User repository
	 * @param queryBus Query bus
	 * @param publisher Event publisher
	 */
	constructor(
		@InjectUserRepository()
		private readonly userRepository: IUserRepository,
		protected readonly queryBus: QueryBus,
		@InjectEventPublisher()
		private readonly publisher: IEventPublisher
	) {
		super(queryBus);
	}

	/**
	 * Deletes a user and publishes an event indicating it.
	 * @param authorId Author's id
	 * @param userId User's id
	 */
	async execute(authorId: VOUuid, userId: VOUuid): Promise<void> {
		await this.isAuthorAllowed(authorId);

		const user = await this.userRepository.findById(userId);

		if (!user) throw new UserNotFoundException();

		user.delete();

		await this.userRepository.delete(userId);

		await this.publisher.publishAll(user.getUncommittedEvents());
		user.commit();
	}
}
