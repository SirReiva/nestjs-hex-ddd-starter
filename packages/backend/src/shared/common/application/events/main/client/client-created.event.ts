import { MAIN_ROUTING_KEY } from '@Main-bc/shared/constants/main-routing-key.constant';
import { Event } from '@Shared/common/application/classes/event.class';

/** Event attributes */
type ClientCreatedEventAttributes = {
	/** User's id */
	userId: string;
	/** Client's id */
	clientId: string;
};

/**
 * Event: Fired when a client is deleted
 */
export class ClientCreatedEvent extends Event<ClientCreatedEventAttributes> {
	/**
	 * Event fields
	 * @param attributes Event attributes
	 */
	constructor(attributes: ClientCreatedEventAttributes) {
		super(`${MAIN_ROUTING_KEY}.1.client.created`, attributes);
	}
}
