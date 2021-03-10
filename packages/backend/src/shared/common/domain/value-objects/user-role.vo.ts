import { EnumValueObject } from '@Shared/common/domain/classes/value-objects/enum-value-object.class';
import { UserRoles } from '../enums/user-roles.enum';

/**
 * User roles value object
 */
export class VOUserRole extends EnumValueObject<UserRoles> {
	/**
	 * Creates a new user roles value object
	 * @param role current value
	 */
	constructor(role: UserRoles) {
		super(role, Object.values(UserRoles));
	}

	/**
	 * Checks if role is admin
	 * @returns True if it is
	 */
	public isAdmin(): boolean {
		return this.value === UserRoles.ADMIN;
	}

	/**
	 * Checks if role is admin manager
	 * @returns True if it is
	 */
	public isAdminManager(): boolean {
		return this.value === UserRoles.ADMIN_MANAGER;
	}

	/**
	 * Checks if role is manager
	 * @returns True if it is
	 */
	public isManager(): boolean {
		return this.value === UserRoles.MANAGER;
	}
}
