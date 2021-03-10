import { Injectable } from '@nestjs/common';
import { InjectAuthRepository } from '@Shared/auth/domain/repository/auth-user-repository.ditoken';
import { IAuthUserRepository } from '@Shared/auth/domain/repository/auth-user-repository.interface';
import { IUseCase } from '@Shared/common/application/interfaces/use-case.interface';
import { VOUuid } from '@Shared/common/domain/value-objects/uuid.vo';

/**
 * Use case: Delete an auth user
 */
@Injectable()
export class AuthUserDeleteUseCase implements IUseCase {
	/**
	 * Dependency injection
	 * @param authUserRepository Auth user repository
	 */
	constructor(
		@InjectAuthRepository()
		private readonly authUserRepository: IAuthUserRepository
	) {}

	/**
	 * Deletes an auth user
	 * @param userId User's id
	 */
	async execute(userId: VOUuid): Promise<void> {
		await this.authUserRepository.delete(userId);
	}
}
