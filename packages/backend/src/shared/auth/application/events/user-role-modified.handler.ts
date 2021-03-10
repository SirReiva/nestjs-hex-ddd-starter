import { Main_BC } from '@Config/contexts/constants/context.constants';
import { Injectable } from '@nestjs/common';
import { IEventHandler } from '@nestjs/cqrs';
import { EventSubscriber } from '@Shared/common/application/decorators/event-subscriber.decorator';
import { UserRoleModifiedEvent } from '@Shared/common/application/events/main/user/user-role-modified.event';
import { VOUserRole } from '@Shared/common/domain/value-objects/user-role.vo';
import { VOUuid } from '@Shared/common/domain/value-objects/uuid.vo';
import { AuthUserUpdateUseCase } from '../use-cases/auth-user-update.usecase';

/**
 * Event handler: User role modified
 */
@Injectable()
export class UserRoleModifiedHandler
	implements IEventHandler<UserRoleModifiedEvent> {
	/**
	 * Dependency injection
	 * @param authUserUpdateUseCase Use case
	 */
	constructor(private readonly authUserUpdateUseCase: AuthUserUpdateUseCase) {}

	/**
	 * Executes the event
	 * @param event Event
	 */
	@EventSubscriber(Main_BC, UserRoleModifiedEvent, AuthUserUpdateUseCase)
	async handle({ attributes }: UserRoleModifiedEvent): Promise<void> {
		await this.authUserUpdateUseCase.execute(
			new VOUuid(attributes.userId),
			new VOUserRole(attributes.role)
		);
	}
}
