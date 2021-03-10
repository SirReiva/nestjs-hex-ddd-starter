import { Main_BC } from '@Config/contexts/constants/context.constants';
import { Injectable } from '@nestjs/common';
import { EventSubscriber } from '@Shared/common/application/decorators/event-subscriber.decorator';
import { UserDeletedEvent } from '@Shared/common/application/events/main/user/user-deleted.event';
import { VOUuid } from '@Shared/common/domain/value-objects/uuid.vo';
import { AuthUserDeleteUseCase } from '../use-cases/auth-user-delete.usecase';

/**
 * Event handler: User deleted
 */
@Injectable()
export class UserDeletedHandler {
	/**
	 * Dependency injection
	 * @param authUserDeleteUseCase Use case
	 */
	constructor(private readonly authUserDeleteUseCase: AuthUserDeleteUseCase) {}

	/**
	 * Executes the event
	 * @param event Event
	 */
	@EventSubscriber(Main_BC, UserDeletedEvent, AuthUserDeleteUseCase)
	async handle({ attributes }: UserDeletedEvent): Promise<void> {
		await this.authUserDeleteUseCase.execute(new VOUuid(attributes.userId));
	}
}
