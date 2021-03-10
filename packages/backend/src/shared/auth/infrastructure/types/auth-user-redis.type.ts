import { UserRoles } from '@Shared/common/domain/enums/user-roles.enum';

export type AuthUserRedis = {
	id: string;
	role: UserRoles;
};
