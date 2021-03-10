import { MAIN_ROUTING_KEY } from '@Main-bc/shared/constants/main-routing-key.constant';
import { Event } from '@Shared/common/application/classes/event.class';

/** Event attributes */
type EmployeeDeletedEventAttributes = {
	/** Employee's id */
	employeeId: string;
	/** Client's id */
	clientId?: string;
	/** Brand's id */
	brandId?: string;
};

/**
 * Event: Fired when employee is deleted
 */
export class EmployeeDeletedEvent extends Event<EmployeeDeletedEventAttributes> {
	/**
	 * Event fields
	 * @param attributes Event attributes
	 */
	constructor(attributes: EmployeeDeletedEventAttributes) {
		super(`${MAIN_ROUTING_KEY}.1.employee.deleted`, attributes);
	}
}
