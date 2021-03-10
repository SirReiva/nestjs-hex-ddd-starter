import { UserErrors } from '@Main-bc/shared/constants/user-errors.enum';
import { CommonFormatException } from '@Shared/common/exceptions/common-format.exception';

/**
 * Exception: No field to modify has been entered.
 */
export class NothingToModifyException extends CommonFormatException {
	/** Creates a new exception */
	constructor() {
		super(UserErrors.USER_NOT_FOUND);
	}
}
