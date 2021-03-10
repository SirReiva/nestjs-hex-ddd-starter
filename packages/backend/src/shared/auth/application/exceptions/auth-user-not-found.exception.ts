import { AuthUserErrors } from '@Shared/auth/shared/constants/auth-user-errors.enum';

/** Exception: Auth user not found */
export class AuthUserNotFoundException extends Error {
	/** Creates a new exception */
	constructor() {
		super(AuthUserErrors.USER_NOT_FOUND);
	}
}
