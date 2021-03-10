import { MAIN_ROUTING_KEY } from '@Main-bc/shared/constants/main-routing-key.constant';
import { Event } from '@Shared/common/application/classes/event.class';

/** Event attributes */
type VisitDeletedEventAttributes = {
	/** Visit's id */
	visitId: string;
	/** Client's id */
	clientId: string;
};

/**
 * Event: Fired when a visit is deleted
 */
export class VisitDeletedEvent extends Event<VisitDeletedEventAttributes> {
	/**
	 * Event fields
	 * @param attributes Event attributes
	 */
	constructor(attributes: VisitDeletedEventAttributes) {
		super(`${MAIN_ROUTING_KEY}.1.visit.deleted`, attributes);
	}
}
