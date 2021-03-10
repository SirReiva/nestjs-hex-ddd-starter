import { UserErrors } from '@Main-bc/shared/constants/user-errors.enum';
import { CommonResourceNotFoundException } from '@Shared/common/exceptions/common-resource-not-found.exception';

/** Exception: User not found in repository */
export class UserNotFoundException extends CommonResourceNotFoundException {
	/** Creates a new exception */
	constructor() {
		super(UserErrors.USER_NOT_FOUND);
	}
}
