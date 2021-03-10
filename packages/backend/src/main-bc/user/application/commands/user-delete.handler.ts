import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { VOUuid } from '@Shared/common/domain/value-objects/uuid.vo';
import { UserDeleteUseCase } from '../use-cases/user-delete.usecase';
import { UserDeleteCommand } from './user-delete.command';

/**
 * Command handler: Delete a user
 */
@CommandHandler(UserDeleteCommand)
export class UserDeleteHandler implements ICommandHandler<UserDeleteCommand> {
	/**
	 * Dependency injection
	 * @param userDeleteUseCase Use case
	 */
	constructor(private readonly userDeleteUseCase: UserDeleteUseCase) {}

	/**
	 * Command execution
	 * @param command Command
	 */
	async execute(command: UserDeleteCommand): Promise<void> {
		await this.userDeleteUseCase.execute(
			new VOUuid(command.authorId),
			new VOUuid(command.userId)
		);
	}
}
