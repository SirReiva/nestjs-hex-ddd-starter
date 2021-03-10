import { MAIN_ROUTING_KEY } from '@Main-bc/shared/constants/main-routing-key.constant';
import { Event } from '@Shared/common/application/classes/event.class';

/** Event attributes */
type ClientNameUpdatedEventAttributes = {
	/** Client's id */
	clientId: string;
	/** Client's name */
	name: string;
};

/**
 * Event: Fired when a client name is updated
 */
export class ClientNameUpdatedEvent extends Event<ClientNameUpdatedEventAttributes> {
	/**
	 * Event fields
	 * @param attributes Event attributes
	 */
	constructor(attributes: ClientNameUpdatedEventAttributes) {
		super(`${MAIN_ROUTING_KEY}.1.client.name_updated`, attributes);
	}
}
