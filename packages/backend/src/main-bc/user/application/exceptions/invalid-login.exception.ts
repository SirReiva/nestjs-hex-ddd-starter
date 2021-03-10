import { UserErrors } from '@Main-bc/shared/constants/user-errors.enum';
import { CommonUnauthorizedException } from '@Shared/common/exceptions/common-unauthorized.exception';

/** Exception: Email and password does not match on login */
export class InvalidLoginException extends CommonUnauthorizedException {
	/** Creates a new exception */
	constructor() {
		super(UserErrors.INVALID_LOGIN);
	}
}
