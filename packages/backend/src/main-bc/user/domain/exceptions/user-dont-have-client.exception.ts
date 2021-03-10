import { UserErrors } from '@Main-bc/shared/constants/user-errors.enum';
import { CommonConflictException } from '@Shared/common/exceptions/common-conflict.exception';

/** Exception: Client's UUID is NOT in user's clients */
export class UserDontHaveClientException extends CommonConflictException {
	/** Creates a new exception */
	constructor() {
		super(UserErrors.USER_DONT_HAVE_CLIENT);
	}
}
