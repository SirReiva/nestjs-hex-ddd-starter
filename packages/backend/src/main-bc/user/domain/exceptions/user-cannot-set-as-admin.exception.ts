import { UserErrors } from '@Main-bc/shared/constants/user-errors.enum';
import { CommonConflictException } from '@Shared/common/exceptions/common-conflict.exception';

/** Exception: User can not set as admin */
export class UserCannotSetAsAdminException extends CommonConflictException {
	/** Creates a new exception */
	constructor() {
		super(UserErrors.USER_CAN_NOT_SET_AS_ADMIN);
	}
}
