import { AggregateRoot } from '@nestjs/cqrs';
import { VOUserRole } from '@Shared/common/domain/value-objects/user-role.vo';
import { VOUuid } from '@Shared/common/domain/value-objects/uuid.vo';

/**
 * Aggregate root: Auth user
 */
export class AuthUserModel extends AggregateRoot {
	/**
	 * Creates a new auth user
	 * @param userId User's id
	 * @param role User's role
	 */
	constructor(public userId: VOUuid, public role: VOUserRole) {
		super();
	}
}
