import { MAIN_ROUTING_KEY } from '@Main-bc/shared/constants/main-routing-key.constant';
import { Event } from '@Shared/common/application/classes/event.class';
import { UserRoles } from '@Shared/common/domain/enums/user-roles.enum';

/** Event attributes */
type UserRoleModifiedEventAttributes = {
	/** User's id */
	userId: string;
	/** User's role */
	role: UserRoles;
};

/**
 * Event: Fired when user's role is modified
 */
export class UserRoleModifiedEvent extends Event<UserRoleModifiedEventAttributes> {
	/**
	 * Event fields
	 * @param attributes Event attributes
	 */
	constructor(attributes: UserRoleModifiedEventAttributes) {
		super(`${MAIN_ROUTING_KEY}.1.user.role_modified`, attributes);
	}
}
