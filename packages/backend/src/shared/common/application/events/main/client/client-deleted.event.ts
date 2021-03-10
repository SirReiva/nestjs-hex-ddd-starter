import { MAIN_ROUTING_KEY } from '@Main-bc/shared/constants/main-routing-key.constant';
import { Event } from '@Shared/common/application/classes/event.class';

/** Event attributes */
type ClientDeletedEventAttributes = {
	/** User's id */
	userId: string;
	/** Client's id */
	clientId: string;
};

/**
 * Event: Fired when client is deleted
 */
export class ClientDeletedEvent extends Event<ClientDeletedEventAttributes> {
	/**
	 * Event fields
	 * @param attributes Event attributes
	 */
	constructor(attributes: ClientDeletedEventAttributes) {
		super(`${MAIN_ROUTING_KEY}.1.client.deleted`, attributes);
	}
}
