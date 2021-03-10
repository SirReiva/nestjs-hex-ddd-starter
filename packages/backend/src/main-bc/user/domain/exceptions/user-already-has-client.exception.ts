import { UserErrors } from '@Main-bc/shared/constants/user-errors.enum';
import { CommonConflictException } from '@Shared/common/exceptions/common-conflict.exception';

/** Exception: Client's UUID already in user's clients */
export class UserAlreadyHasClientException extends CommonConflictException {
	/** Creates a new exception */
	constructor() {
		super(UserErrors.USER_ALREADY_HAS_CLIENT);
	}
}
