import { UserCreateUseCase } from '@Main-bc/user/application/use-cases/user-create.usecase';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { VOEmail } from '@Shared/common/domain/value-objects/email.vo';
import { VOHashedPassword } from '@Shared/common/domain/value-objects/hashed-password.vo';
import { VOName } from '@Shared/common/domain/value-objects/name.vo';
import { VOUserRole } from '@Shared/common/domain/value-objects/user-role.vo';
import { VOUuid } from '@Shared/common/domain/value-objects/uuid.vo';
import { UserCreateCommand } from './user-create.command';

/**
 * Command handler: Create a new user
 */
@CommandHandler(UserCreateCommand)
export class UserCreateHandler implements ICommandHandler<UserCreateCommand> {
	/**
	 * Dependency injection
	 * @param userCreateUseCase Use case
	 */
	constructor(private readonly userCreateUseCase: UserCreateUseCase) {}

	/**
	 * Command execution
	 * @param command Command
	 */
	public async execute(command: UserCreateCommand): Promise<void> {
		await this.userCreateUseCase.execute(
			new VOUuid(command.authorId),
			new VOUuid(command.userId),
			new VOEmail(command.email),
			new VOName(command.name),
			new VOName(command.surname),
			await VOHashedPassword.createFromPlainText(command.password),
			new VOUserRole(command.role)
		);
	}
}
