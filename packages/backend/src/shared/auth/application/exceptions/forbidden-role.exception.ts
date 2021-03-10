import { AuthUserErrors } from '@Shared/auth/shared/constants/auth-user-errors.enum';
/** Exception: Forbidden operation for user */
export class ForbiddenRoleException extends Error {
	/** Creates a new exception */
	constructor() {
		super(AuthUserErrors.FORBIDDEN);
	}
}
