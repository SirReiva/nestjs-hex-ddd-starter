import { ICommand } from '@nestjs/cqrs';
import { UserRoles } from '@Shared/common/domain/enums/user-roles.enum';

/**
 * Command: Update a user
 */
export class UserUpdateCommand implements ICommand {
	/**
	 * Command fields
	 * @param authorId Author's id
	 * @param userId User's id
	 * @param email User's new email
	 * @param name User's new name
	 * @param surname User's new surname
	 * @param password User's new password
	 * @param role User's role
	 */
	constructor(
		public readonly authorId: string,
		public readonly userId: string,
		public readonly email: string | null,
		public readonly name: string | null,
		public readonly surname: string | null,
		public readonly password: string | null,
		public readonly role: UserRoles | null
	) {}
}
