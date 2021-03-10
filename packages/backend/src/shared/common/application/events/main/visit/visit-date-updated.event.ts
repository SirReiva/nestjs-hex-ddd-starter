import { MAIN_ROUTING_KEY } from '@Main-bc/shared/constants/main-routing-key.constant';
import { Event } from '@Shared/common/application/classes/event.class';

/** Event attributes */
type VisitDateUpdatedEventAttributes = {
	/** Visit's id */
	visitId: string;
	/** Visit's new date */
	newDate: string;
};

/**
 * Event: Fired when a visit date is updated
 */
export class VisitDateUpdatedEvent extends Event<VisitDateUpdatedEventAttributes> {
	/**
	 * Event fields
	 * @param attributes Event attributes
	 */
	constructor(attributes: VisitDateUpdatedEventAttributes) {
		super(`${MAIN_ROUTING_KEY}.1.visit.date_updated`, attributes);
	}
}
