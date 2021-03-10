import { Injectable } from '@nestjs/common';
import { AuthUserNotFoundException } from '@Shared/auth/application/exceptions/auth-user-not-found.exception';
import { InjectAuthRepository } from '@Shared/auth/domain/repository/auth-user-repository.ditoken';
import { IAuthUserRepository } from '@Shared/auth/domain/repository/auth-user-repository.interface';
import { IUseCase } from '@Shared/common/application/interfaces/use-case.interface';
import { VOUserRole } from '@Shared/common/domain/value-objects/user-role.vo';
import { VOUuid } from '@Shared/common/domain/value-objects/uuid.vo';

/**
 * Use case: Get role of an auth user
 */
@Injectable()
export class GetUserRoleUseCase implements IUseCase {
	/**
	 * Dependency injection
	 * @param authUserRepository Auth user repository
	 */
	constructor(
		@InjectAuthRepository()
		private readonly authUserRepository: IAuthUserRepository
	) {}

	/**
	 * Gets the role of an user
	 * @param userId User's id
	 */
	async execute(userId: VOUuid): Promise<VOUserRole> {
		const user = await this.authUserRepository.findOne(userId);

		if (!user) throw new AuthUserNotFoundException();

		return user.role;
	}
}
