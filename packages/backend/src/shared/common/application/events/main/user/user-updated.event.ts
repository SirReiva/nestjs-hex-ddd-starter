import { MAIN_ROUTING_KEY } from '@Main-bc/shared/constants/main-routing-key.constant';
import { Event } from '@Shared/common/application/classes/event.class';

/** Event attributes */
type UserUpdatedEventAttributes = {
	/** User's id */
	userId: string;
	/** User's name */
	name: string;
	/** User's surname */
	surname: string;
};

/**
 * Event: Fired when a user is updated
 */
export class UserUpdatedEvent extends Event<UserUpdatedEventAttributes> {
	/**
	 * Event fields
	 * @param attributes Event attributes
	 */
	constructor(attributes: UserUpdatedEventAttributes) {
		super(`${MAIN_ROUTING_KEY}.1.user.updated`, attributes);
	}
}
