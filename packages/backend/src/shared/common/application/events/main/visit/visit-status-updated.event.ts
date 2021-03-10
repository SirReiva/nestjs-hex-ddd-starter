import { MAIN_ROUTING_KEY } from '@Main-bc/shared/constants/main-routing-key.constant';
import { Event } from '@Shared/common/application/classes/event.class';
import { VisitStatus } from '@Shared/common/domain/enums/visit-status.enum';

/** Event attributes */
type VisitStatusUpdatedEventAttributes = {
	/** Visit's id */
	visitId: string;
	/** Visit's new status */
	newStatus: VisitStatus;
};

/**
 * Event: Fired when a visit status is updated
 */
export class VisitStatusUpdatedEvent extends Event<VisitStatusUpdatedEventAttributes> {
	/**
	 * Event fields
	 * @param attributes Event attributes
	 */
	constructor(attributes: VisitStatusUpdatedEventAttributes) {
		super(`${MAIN_ROUTING_KEY}.1.visit.status_updated`, attributes);
	}
}
