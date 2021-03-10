import { MAIN_ROUTING_KEY } from '@Main-bc/shared/constants/main-routing-key.constant';
import { Event } from '@Shared/common/application/classes/event.class';

/** Event attributes */
type VisitCreatedEventAttributes = {
	/** Visit's id */
	visitId: string;
	/** Client's id */
	clientId: string;
};

/**
 * Event: Fired when a visit is created
 */
export class VisitCreatedEvent extends Event<VisitCreatedEventAttributes> {
	/**
	 * Event fields
	 * @param attributes Event attributes
	 */
	constructor(attributes: VisitCreatedEventAttributes) {
		super(`${MAIN_ROUTING_KEY}.1.visit.created`, attributes);
	}
}
