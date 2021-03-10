import { IRepository } from '@Shared/common/domain/interfaces/repository.interface';
import { VOUuid } from '@Shared/common/domain/value-objects/uuid.vo';
import { AuthUserModel } from '../models/auth-user.model';

/** Auth user's repository interface */
export interface IAuthUserRepository extends IRepository<AuthUserModel> {
	/**
	 * Creates a new user
	 * @param user User
	 */
	save(user: AuthUserModel): Promise<void>;
	/**
	 * Finds a user by id
	 * @param userId User's id
	 */
	findOne(userId: VOUuid): Promise<AuthUserModel>;
	/**
	 * Updates a user
	 * @param user User
	 */
	update(user: AuthUserModel): Promise<void>;
	/**
	 * Deletes a user
	 * @param userId User's id
	 */
	delete(userId: VOUuid): Promise<void>;
}
