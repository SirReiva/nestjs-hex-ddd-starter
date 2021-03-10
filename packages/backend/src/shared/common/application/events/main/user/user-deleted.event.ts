import { MAIN_ROUTING_KEY } from '@Main-bc/shared/constants/main-routing-key.constant';
import { Event } from '@Shared/common/application/classes/event.class';

/** Event attributes */
type UserDeletedEventAttributes = {
	/** User's id */
	userId: string;
};

/**
 * Event: Fired when a user is deleted
 */
export class UserDeletedEvent extends Event<UserDeletedEventAttributes> {
	/**
	 * Event fields
	 * @param attributes Event attributes
	 */
	constructor(attributes: UserDeletedEventAttributes) {
		super(`${MAIN_ROUTING_KEY}.1.user.deleted`, attributes);
	}
}
