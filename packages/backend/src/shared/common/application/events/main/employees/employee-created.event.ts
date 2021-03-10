import { MAIN_ROUTING_KEY } from '@Main-bc/shared/constants/main-routing-key.constant';
import { Event } from '@Shared/common/application/classes/event.class';

/** Event attributes */
type EmployeeCreatedEventAttributes = {
	/** Employee's id */
	employeeId: string;
	/** Client's id */
	clientId?: string;
	/** Brand's id */
	brandId?: string;
};

/**
 * Event: Fired when employee is created
 */
export class EmployeeCreatedEvent extends Event<EmployeeCreatedEventAttributes> {
	/**
	 * Event fields
	 * @param attributes Event attributes
	 */
	constructor(attributes: EmployeeCreatedEventAttributes) {
		super(`${MAIN_ROUTING_KEY}.1.employee.created`, attributes);
	}
}
