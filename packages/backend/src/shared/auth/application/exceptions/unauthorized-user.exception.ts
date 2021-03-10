import { AuthUserErrors } from '@Shared/auth/shared/constants/auth-user-errors.enum';

/** Exception: Unauthorized user */
export class UnauthorizedUserException extends Error {
	/** Creates a new exception */
	constructor() {
		super(AuthUserErrors.UNAUTHORIZED);
	}
}
