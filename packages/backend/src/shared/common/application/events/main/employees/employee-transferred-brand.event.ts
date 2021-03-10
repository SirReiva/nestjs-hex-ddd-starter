import { MAIN_ROUTING_KEY } from '@Main-bc/shared/constants/main-routing-key.constant';
import { Event } from '@Shared/common/application/classes/event.class';

/** Event attributes */
type EmployeeTransferredBrandEventAttributes = {
	/** Employee's id */
	employeeId: string;
	/** Old brand's id */
	oldBrandId: string | null;
	/** New brand's id */
	newBrandId: string | null;
};

/**
 * Event: Fired when employee's owner brand is updated
 */
export class EmployeeTransferredBrandEvent extends Event<EmployeeTransferredBrandEventAttributes> {
	/**
	 * Event fields
	 * @param attributes Event attributes
	 */
	constructor(attributes: EmployeeTransferredBrandEventAttributes) {
		super(`${MAIN_ROUTING_KEY}.1.employee.transferred_brand`, attributes);
	}
}
