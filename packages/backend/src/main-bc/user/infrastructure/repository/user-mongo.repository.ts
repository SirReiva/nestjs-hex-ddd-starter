import {
	getCurrentSession,
	WithTransaction,
} from '@Config/mongodb/decorators/transactional.decorator';
import { Schemas } from '@Config/mongodb/enums/schemas.enum';
import { IUser, IUserDoc } from '@Config/mongodb/interfaces/user-doc.interface';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { VOEmail } from '@Shared/common/domain/value-objects/email.vo';
import { VOHashedPassword } from '@Shared/common/domain/value-objects/hashed-password.vo';
import { VOName } from '@Shared/common/domain/value-objects/name.vo';
import { VOUserRole } from '@Shared/common/domain/value-objects/user-role.vo';
import { VOUuid } from '@Shared/common/domain/value-objects/uuid.vo';
import { Model } from 'mongoose';
import { UserModel } from '@Main-bc/user/domain/models/user.model';
import { IUserRepository } from '@Main-bc/user/domain/repository/user-repository.interface';

/**
 * User's repository MongoDB implementation
 */
@Injectable()
export class UserMongoRepository implements IUserRepository {
	/**
	 * Dependency injection
	 * @param userModel User mongoose model
	 */
	constructor(
		@InjectModel(Schemas.USERS)
		private readonly userModel: Model<IUserDoc>
	) {}

	/**
	 * Creates a domain entity from database entity
	 * @param persistentEntity Database entity
	 */
	toDomain(persistentEntity: IUserDoc): UserModel {
		const { _id, email, name, surname, password, role } = persistentEntity;

		return new UserModel(
			new VOUuid(_id),
			new VOEmail(email),
			new VOName(name),
			new VOName(surname),
			VOHashedPassword.createFromHash(password),
			new VOUserRole(role)
		);
	}

	/**
	 * Creates a database entity from domain entity
	 * @param domainEntity Domain entity
	 */
	toPersistence(domainEntity: UserModel): IUser {
		const { userId, email, name, surname, password, role } = domainEntity;

		return {
			_id: userId.value,
			email: email.value,
			name: name.value,
			surname: surname.value,
			password: password.value,
			role: role.value,
		};
	}

	/**
	 * Creates a new user
	 * @param user User
	 */
	async create(user: UserModel): Promise<void> {
		const persistentUser = this.toPersistence(user);

		await this.userModel.create(persistentUser);
	}

	/**
	 * Finds all existing users
	 * @returns Users array
	 */
	async find(): Promise<UserModel[]> {
		const persistanceUsers = await this.userModel.find().exec();

		return persistanceUsers.map(user => this.toDomain(user));
	}

	/**
	 * Finds a user by id
	 * @param userId User's id
	 */
	async findById(userId: VOUuid): Promise<UserModel> {
		const existingUser = await this.userModel.findById(userId.value).exec();

		if (!existingUser) return null;

		return this.toDomain(existingUser);
	}

	/**
	 * Finds a user by email
	 * @param userEmail User's email
	 */
	async findByEmail(userEmail: VOEmail): Promise<UserModel> {
		const existingUser = await this.userModel
			.findOne({ email: userEmail.value })
			.exec();

		if (!existingUser) return null;

		return this.toDomain(existingUser);
	}

	/**
	 * Updates a user
	 * @param user User
	 */
	async update(user: UserModel): Promise<void> {
		const persistentUser = this.toPersistence(user);

		const { _id, ...rest } = persistentUser;

		await this.userModel.findByIdAndUpdate(_id, rest).exec();
	}

	/**
	 * Updates multiple users at the same time, as a transaction
	 * @param user User
	 */
	@WithTransaction
	async updateMany(users: UserModel[]): Promise<void> {
		const persistentUsers = users.map(user => this.toPersistence(user));

		for (const persistentUser of persistentUsers) {
			const { _id, ...rest } = persistentUser;

			await this.userModel
				.findByIdAndUpdate(_id, rest)
				.session(getCurrentSession())
				.exec();
		}
	}

	/**
	 * Deletes a user by id
	 * @param userId USer's id
	 */
	async delete(userId: VOUuid): Promise<void> {
		await this.userModel.findByIdAndDelete(userId.value).exec();
	}
}
