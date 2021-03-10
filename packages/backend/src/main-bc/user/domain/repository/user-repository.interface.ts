import { IRepository } from '@Shared/common/domain/interfaces/repository.interface';
import { VOEmail } from '@Shared/common/domain/value-objects/email.vo';
import { VOUuid } from '@Shared/common/domain/value-objects/uuid.vo';
import { UserModel } from '../models/user.model';

/**
 * User's repository interface
 */
export interface IUserRepository extends IRepository<UserModel> {
	/**
	 * Creates a new user
	 * @param user User
	 */
	create(user: UserModel): Promise<void>;
	/**
	 * Finds all existing users
	 * @returns Users array
	 */
	find(): Promise<UserModel[]>;
	/**
	 * Finds a user by id
	 * @param userId User's id
	 */
	findById(userId: VOUuid): Promise<UserModel>;
	/**
	 * Finds a user by email
	 * @param userEmail User's email
	 */
	findByEmail(userEmail: VOEmail): Promise<UserModel>;
	/**
	 * Updates a user
	 * @param user User
	 */
	update(user: UserModel): Promise<void>;
	/**
	 * Updates multiple users at the same time, as a transaction
	 * @param user User
	 */
	updateMany(users: UserModel[]): Promise<void>;
	/**
	 * Deletes a user by id
	 * @param userId USer's id
	 */
	delete(userId: VOUuid): Promise<void>;
}
