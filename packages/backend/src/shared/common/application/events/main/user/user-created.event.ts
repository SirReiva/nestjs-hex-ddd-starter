import { MAIN_ROUTING_KEY } from '@Main-bc/shared/constants/main-routing-key.constant';
import { Event } from '@Shared/common/application/classes/event.class';
import { UserRoles } from '@Shared/common/domain/enums/user-roles.enum';

/** Event attributes */
type UserCreatedEventAttributes = {
	/** User's id */
	userId: string;
	/** User's role */
	role: UserRoles;
};

/**
 * Event: Fired when a user is created
 */
export class UserCreatedEvent extends Event<UserCreatedEventAttributes> {
	/**
	 * Event fields
	 * @param attributes Event attributes
	 */
	constructor(attributes: UserCreatedEventAttributes) {
		super(`${MAIN_ROUTING_KEY}.1.user.created`, attributes);
	}
}
