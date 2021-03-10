import { MAIN_ROUTING_KEY } from '@Main-bc/shared/constants/main-routing-key.constant';
import { Event } from '@Shared/common/application/classes/event.class';

/** Event attributes */
type BrandDeletedEventAttributes = {
	/** Brand's id */
	brandId: string;
};

/**
 * Event: Fired when brand is deleted
 */
export class BrandDeletedEvent extends Event<BrandDeletedEventAttributes> {
	/**
	 * Event fields
	 * @param attributes Event attributes
	 */
	constructor(attributes: BrandDeletedEventAttributes) {
		super(`${MAIN_ROUTING_KEY}.1.brand.deleted`, attributes);
	}
}
