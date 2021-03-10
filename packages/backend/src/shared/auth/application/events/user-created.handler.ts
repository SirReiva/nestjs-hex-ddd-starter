import { Main_BC } from '@Config/contexts/constants/context.constants';
import { Injectable } from '@nestjs/common';
import { EventSubscriber } from '@Shared/common/application/decorators/event-subscriber.decorator';
import { UserCreatedEvent } from '@Shared/common/application/events/main/user/user-created.event';
import { VOUserRole } from '@Shared/common/domain/value-objects/user-role.vo';
import { VOUuid } from '@Shared/common/domain/value-objects/uuid.vo';
import { AuthUserCreateUseCase } from '../use-cases/auth-user-create.usecase';

/**
 * Event handler: User created
 */
@Injectable()
export class UserCreatedHandler {
	/**
	 * Dependency injection
	 * @param authUserCreateUseCase Use case
	 */
	constructor(private readonly authUserCreateUseCase: AuthUserCreateUseCase) {}

	/**
	 * Executes the event
	 * @param event Event
	 */
	@EventSubscriber(Main_BC, UserCreatedEvent, AuthUserCreateUseCase)
	async handle({ attributes }: UserCreatedEvent): Promise<void> {
		await this.authUserCreateUseCase.execute(
			new VOUuid(attributes.userId),
			new VOUserRole(attributes.role)
		);
	}
}
