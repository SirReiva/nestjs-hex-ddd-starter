import { ICommand } from '@nestjs/cqrs';

/**
 * Command: Delete a user
 */
export class UserDeleteCommand implements ICommand {
	/**
	 * Command fields
	 * @param authorId Author's id
	 * @param userId User's id
	 */
	constructor(
		public readonly authorId: string,
		public readonly userId: string
	) {}
}
