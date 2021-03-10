import { UserErrors } from '@Main-bc/shared/constants/user-errors.enum';
import { CommonConflictException } from '@Shared/common/exceptions/common-conflict.exception';

/** Exception: Can not modify admin role */
export class UserCannotModifyAdminRoleException extends CommonConflictException {
	/** Creates a new exception */
	constructor() {
		super(UserErrors.USER_CAN_NOT_MODIFY_ADMIN_ROLE);
	}
}
