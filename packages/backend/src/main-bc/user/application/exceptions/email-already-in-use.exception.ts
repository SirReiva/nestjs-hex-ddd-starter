import { UserErrors } from '@Main-bc/shared/constants/user-errors.enum';
import { CommonDuplicateIdentifierException } from '@Shared/common/exceptions/common-duplicate-identifier.exception';

/** Exception: Email already registered as other user */
export class EmailAlreadyInUseException extends CommonDuplicateIdentifierException {
	/** Creates a new exception */
	constructor() {
		super(UserErrors.EMAIL_ALREADY_IN_USE);
	}
}
