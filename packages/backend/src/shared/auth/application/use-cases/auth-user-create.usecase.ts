import { Injectable } from '@nestjs/common';
import { AuthUserModel } from '@Shared/auth/domain/models/auth-user.model';
import { InjectAuthRepository } from '@Shared/auth/domain/repository/auth-user-repository.ditoken';
import { IAuthUserRepository } from '@Shared/auth/domain/repository/auth-user-repository.interface';
import { IUseCase } from '@Shared/common/application/interfaces/use-case.interface';
import { VOUserRole } from '@Shared/common/domain/value-objects/user-role.vo';
import { VOUuid } from '@Shared/common/domain/value-objects/uuid.vo';

/**
 * Use case: Create auth user
 */
@Injectable()
export class AuthUserCreateUseCase implements IUseCase {
	/**
	 * Dependency injection
	 * @param authUserRepository Auth user repository
	 */
	constructor(
		@InjectAuthRepository()
		private readonly authUserRepository: IAuthUserRepository
	) {}

	/**
	 * Creates a new auth user
	 * @param userId User's id
	 * @param role User's role
	 */
	async execute(userId: VOUuid, role: VOUserRole): Promise<void> {
		const user = new AuthUserModel(userId, role);

		await this.authUserRepository.save(user);
	}
}
