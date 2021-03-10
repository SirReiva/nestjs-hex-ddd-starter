import { MAIN_ROUTING_KEY } from '@Main-bc/shared/constants/main-routing-key.constant';
import { Event } from '@Shared/common/application/classes/event.class';

/** Event attributes */
type ClientTransferredEventAttributes = {
	/** Old user's id */
	oldUserId: string;
	/** New user's id */
	newUserId: string;
	/** Client's id */
	clientId: string;
};

/**
 * Event: Fired when client change his user
 */
export class ClientTransferredEvent extends Event<ClientTransferredEventAttributes> {
	/**
	 * Event fields
	 * @param attributes Event attributes
	 */
	constructor(attributes: ClientTransferredEventAttributes) {
		super(`${MAIN_ROUTING_KEY}.1.client.transferred`, attributes);
	}
}
