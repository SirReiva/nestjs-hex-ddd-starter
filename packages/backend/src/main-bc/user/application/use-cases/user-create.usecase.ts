import { EmailAlreadyInUseException } from '@Main-bc/user/application/exceptions/email-already-in-use.exception';
import { UserModel } from '@Main-bc/user/domain/models/user.model';
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
import { UserIdAlreadyInUseException } from '../exceptions/user-id-already-in-use.exception';

/**
 * Use case: Create a new user
 */
@Injectable()
export class UserCreateUseCase extends AdminUseCase {
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
	 * Registers a new user and publishes an event indicating it.
	 * @param authorId Author's id
	 * @param userId User's id
	 * @param email User's email
	 * @param name User's name
	 * @param surname User's surname
	 * @param password User's password
	 * @param role User's role
	 */
	async execute(
		authorId: VOUuid,
		userId: VOUuid,
		email: VOEmail,
		name: VOName,
		surname: VOName,
		password: VOHashedPassword,
		role: VOUserRole
	): Promise<void> {
		await this.isAuthorAllowed(authorId);

		let existingUser = await this.userRepository.findByEmail(email);

		if (existingUser) throw new EmailAlreadyInUseException();

		existingUser = await this.userRepository.findById(userId);

		if (existingUser) throw new UserIdAlreadyInUseException();

		const user = UserModel.create(
			userId,
			email,
			name,
			surname,
			password,
			role,
			[]
		);

		await this.userRepository.create(user);

		await this.publisher.publishAll(user.getUncommittedEvents());
		user.commit();
	}
}
