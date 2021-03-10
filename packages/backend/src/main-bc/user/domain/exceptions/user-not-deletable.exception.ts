import { UserErrors } from '@Main-bc/shared/constants/user-errors.enum';
import { CommonConflictException } from '@Shared/common/exceptions/common-conflict.exception';

/**
 * Exception: Can not delete a specific user
 */
export class UserNotDeletableException extends CommonConflictException {
	/** Creates a new exception */
	constructor() {
		super(UserErrors.USER_NOT_DELETABLE);
	}
}
