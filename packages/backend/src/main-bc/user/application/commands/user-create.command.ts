import { ICommand } from '@nestjs/cqrs';
import { UserRoles } from '@Shared/common/domain/enums/user-roles.enum';

/**
 * Command: Create a new user
 */
export class UserCreateCommand implements ICommand {
	/**
	 * Command fields
	 * @param authorId Author's id
	 * @param userId User's id
	 * @param email User's email
	 * @param name User's name
	 * @param surname User's surname
	 * @param password User's password
	 * @param role User's role
	 */
	constructor(
		public readonly authorId: string,
		public readonly userId: string,
		public readonly email: string,
		public readonly name: string,
		public readonly surname: string,
		public readonly password: string,
		public readonly role: UserRoles
	) {}
}
