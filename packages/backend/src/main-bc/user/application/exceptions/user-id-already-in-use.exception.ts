import { UserErrors } from '@Main-bc/shared/constants/user-errors.enum';
import { CommonDuplicateIdentifierException } from '@Shared/common/exceptions/common-duplicate-identifier.exception';

/** Exception: UUID already registered as other user */
export class UserIdAlreadyInUseException extends CommonDuplicateIdentifierException {
	/** Creates a new exception */
	constructor() {
		super(UserErrors.ID_ALREADY_IN_USE);
	}
}
