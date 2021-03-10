import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { VOEmail } from '@Shared/common/domain/value-objects/email.vo';
import { VOHashedPassword } from '@Shared/common/domain/value-objects/hashed-password.vo';
import { VOName } from '@Shared/common/domain/value-objects/name.vo';
import { VOUserRole } from '@Shared/common/domain/value-objects/user-role.vo';
import { VOUuid } from '@Shared/common/domain/value-objects/uuid.vo';
import { UserUpdateUseCase } from '../use-cases/user-update.usecase';
import { UserUpdateCommand } from './user-update.command';

/**
 * Command handler: Update a user
 */
@CommandHandler(UserUpdateCommand)
export class UserUpdateHandler implements ICommandHandler<UserUpdateCommand> {
	/**
	 * Dependency injection
	 * @param userUpdateUseCase Use case
	 */
	constructor(private readonly userUpdateUseCase: UserUpdateUseCase) {}

	/**
	 * Command execution
	 * @param command Command
	 */
	async execute(command: UserUpdateCommand): Promise<void> {
		const name = command.name ? new VOName(command.name) : null;
		const surname = command.surname ? new VOName(command.surname) : null;
		const email = command.email ? new VOEmail(command.email) : null;
		const password = command.password
			? await VOHashedPassword.createFromPlainText(command.password)
			: null;
		const role = command.role ? new VOUserRole(command.role) : null;

		await this.userUpdateUseCase.execute(
			new VOUuid(command.authorId),
			new VOUuid(command.userId),
			email,
			name,
			surname,
			password,
			role
		);
	}
}
