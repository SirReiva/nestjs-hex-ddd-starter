import { MAIN_ROUTING_KEY } from '@Main-bc/shared/constants/main-routing-key.constant';
import { Event } from '@Shared/common/application/classes/event.class';

/** Event attributes */
type EmployeeTransferredClientEventAttributes = {
	/** Employee's id */
	employeeId: string;
	/** Old client's id */
	oldClientId: string | null;
	/** New client's id */
	newClientId: string | null;
};

/**
 * Event: Fired when employee's owner client is updated
 */
export class EmployeeTransferredClientEvent extends Event<EmployeeTransferredClientEventAttributes> {
	/**
	 * Event fields
	 * @param attributes Event attributes
	 */
	constructor(attributes: EmployeeTransferredClientEventAttributes) {
		super(`${MAIN_ROUTING_KEY}.1.employee.transferred_client`, attributes);
	}
}
