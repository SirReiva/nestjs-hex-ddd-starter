import { UserNotFoundException } from '@Main-bc/user/application/exceptions/user-not-found.exception';
import { InjectUserRepository } from '@Main-bc/user/domain/repository/user-repository.ditoken';
import { IUserRepository } from '@Main-bc/user/domain/repository/user-repository.interface';
import { Injectable } from '@nestjs/common';
import { IEventPublisher, QueryBus } from '@nestjs/cqrs';
import { AdminUseCase } from '@Shared/auth/application/classes/admin-use-case.class';
import { VOEmail } from '@Shared/common/domain/value-objects/email.vo';
import { VOHashedPassword } from '@Shared/common/domain/value-objects/hashed-password.vo';
import { VOName } from '@Shared/common/domain/value-objects/name.vo';
import { VOUserRole } from '@Shared/common/domain/value-objects/user-role.vo';
import { VOUuid } from '@Shared/common/domain/value-objects/uuid.vo';
import { InjectEventPublisher } from '@Shared/common/infrastructure/decorators/event-publisher.ditoken';
import { EmailAlreadyInUseException } from '../exceptions/email-already-in-use.exception';
import { NothingToModifyException } from '../exceptions/nothing-to-modify.exception';

/**
 * Use case: Update a user
 */
@Injectable()
export class UserUpdateUseCase extends AdminUseCase {
	/**
	 * Dependency injection
	 * @param userRepository User repository
	 * @param queryBus Query bus
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
	 * Updates a user.
	 * @param authorId Author's id
	 * @param userId User's id
	 * @param email User's new email
	 * @param name User's new name
	 * @param surname User's new surname
	 * @param password User's new password
	 * @param role User's role
	 */
	async execute(
		authorId: VOUuid,
		userId: VOUuid,
		email: VOEmail | null,
		name: VOName | null,
		surname: VOName | null,
		password: VOHashedPassword | null,
		role: VOUserRole | null
	): Promise<void> {
		await this.isAuthorAllowed(authorId);

		if (!email && !name && !surname && !password && !role)
			throw new NothingToModifyException();

		const user = await this.userRepository.findById(userId);

		if (!user) throw new UserNotFoundException();

		if (!email.equals(user.email)) {
			const userByEmail = await this.userRepository.findByEmail(email);

			if (userByEmail) throw new EmailAlreadyInUseException();
		}

		user.update(email, name, surname, password, role);

		await this.userRepository.update(user);

		if (role) {
			await this.publisher.publishAll(user.getUncommittedEvents());
			user.commit();
		}
	}
}
