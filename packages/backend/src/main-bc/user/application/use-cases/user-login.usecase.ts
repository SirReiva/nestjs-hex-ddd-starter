import { InjectUserRepository } from '@Main-bc/user/domain/repository/user-repository.ditoken';
import { IUserRepository } from '@Main-bc/user/domain/repository/user-repository.interface';
import { Injectable } from '@nestjs/common';
import { IUseCase } from '@Shared/common/application/interfaces/use-case.interface';
import { VOEmail } from '@Shared/common/domain/value-objects/email.vo';
import { VOPlainTextPassword } from '@Shared/common/domain/value-objects/plain-text-password.vo';
import { VOUuid } from '@Shared/common/domain/value-objects/uuid.vo';
import { InvalidLoginException } from '../exceptions/invalid-login.exception';

/**
 * Use case: Login as user
 */
@Injectable()
export class UserLoginUseCase implements IUseCase {
	/**
	 * Dependency injection
	 * @param userRepository User repository
	 */
	constructor(
		@InjectUserRepository()
		private readonly userRepository: IUserRepository
	) {}

	/**
	 * Finds a user in the repository, whose email and password match those given.
	 * @param email User's email
	 * @param password User's password
	 * @returns User's id
	 */
	async execute(
		email: VOEmail,
		password: VOPlainTextPassword
	): Promise<VOUuid> {
		const existingUser = await this.userRepository.findByEmail(email);

		if (!existingUser) throw new InvalidLoginException();

		if (!(await existingUser.checkPassword(password))) {
			throw new InvalidLoginException();
		}

		return existingUser.userId;
	}
}
