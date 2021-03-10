import { AggregateRoot } from '@nestjs/cqrs';
import { UserCreatedEvent } from '@Shared/common/application/events/main/user/user-created.event';
import { UserDeletedEvent } from '@Shared/common/application/events/main/user/user-deleted.event';
import { UserRoleModifiedEvent } from '@Shared/common/application/events/main/user/user-role-modified.event';
import { UserUpdatedEvent } from '@Shared/common/application/events/main/user/user-updated.event';
import { VOEmail } from '@Shared/common/domain/value-objects/email.vo';
import { VOHashedPassword } from '@Shared/common/domain/value-objects/hashed-password.vo';
import { VOName } from '@Shared/common/domain/value-objects/name.vo';
import { VOPlainTextPassword } from '@Shared/common/domain/value-objects/plain-text-password.vo';
import { VOUserRole } from '@Shared/common/domain/value-objects/user-role.vo';
import { VOUuid } from '@Shared/common/domain/value-objects/uuid.vo';
import { UserCannotModifyAdminRoleException } from '../exceptions/user-cannot-modify-admin-role.exception';
import { UserCannotSetAsAdminException } from '../exceptions/user-cannot-set-as-admin.exception';

/**
 * Aggregate root: User
 */
export class UserModel extends AggregateRoot {
	/**
	 * User fields
	 * @param userId User's userId
	 * @param email User's email
	 * @param name User's name
	 * @param surname User's surname
	 * @param password User's password
	 * @param role User's role
	 * @param clients User's clients
	 */
	constructor(
		public readonly userId: VOUuid,
		public email: VOEmail,
		public name: VOName,
		public surname: VOName,
		public password: VOHashedPassword,
		public role: VOUserRole
	) {
		super();
	}

	/**
	 * Sets a new role to user, and fires an event if role has changed.
	 * @param role New user's role
	 */
	private setRole(role: VOUserRole): void {
		if (this.role.isAdmin()) throw new UserCannotModifyAdminRoleException();

		if (role.isAdmin()) throw new UserCannotSetAsAdminException();

		if (!this.role.equals(role)) {
			this.role = role;
			this.apply(
				new UserRoleModifiedEvent({
					userId: this.userId.value,
					role: this.role.value,
				})
			);
		}
	}

	/**
	 * Creates a new user, hashing password and firing an event indicating it
	 * @param userId User's userId
	 * @param email User's email
	 * @param name User's name
	 * @param surname User's surname
	 * @param password User's password as plain text
	 * @param role User's role
	 * @param clients User's clients
	 */
	public static create(
		userId: VOUuid,
		email: VOEmail,
		name: VOName,
		surname: VOName,
		password: VOHashedPassword,
		role: VOUserRole,
		clients: VOUuid[]
	): UserModel {
		const user = new UserModel(userId, email, name, surname, password, role);

		user.apply(
			new UserCreatedEvent({ userId: userId.value, role: role.value })
		);

		return user;
	}

	/**
	 * Updates the user
	 * @param email User's email
	 * @param name User's name
	 * @param surname User's surname
	 * @param password User's password
	 * @param role User's role
	 */
	public update(
		email: VOEmail | null,
		name: VOName | null,
		surname: VOName | null,
		password: VOHashedPassword | null,
		role: VOUserRole | null
	): void {
		this.email = email;
		this.name = name;
		this.surname = surname;
		password && (this.password = password);
		!this.role.equals(role) && this.setRole(role);

		this.apply(
			new UserUpdatedEvent({
				userId: this.userId.value,
				name: this.name.value,
				surname: this.surname.value,
			})
		);
	}

	/**
	 * Deletes the user and fires an event indicating it.
	 */
	public delete(): void {
		this.apply(new UserDeletedEvent({ userId: this.userId.value }));
	}

	/**
	 * Checks if user's password matches with a given password
	 * @param password Password as plain text
	 * @returns True if matches
	 */
	public async checkPassword(password: VOPlainTextPassword): Promise<boolean> {
		return await this.password.compare(password);
	}
}
