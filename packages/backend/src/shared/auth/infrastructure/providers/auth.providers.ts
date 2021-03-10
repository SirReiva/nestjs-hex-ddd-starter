import { UserCreatedHandler } from '@Shared/auth/application/events/user-created.handler';
import { UserDeletedHandler } from '@Shared/auth/application/events/user-deleted.handler';
import { UserRoleModifiedHandler } from '@Shared/auth/application/events/user-role-modified.handler';
import { GetAuthUserRoleHandler } from '@Shared/auth/application/queries/get-auth-user-role.handler';
import { AuthUserCreateUseCase } from '@Shared/auth/application/use-cases/auth-user-create.usecase';
import { AuthUserDeleteUseCase } from '@Shared/auth/application/use-cases/auth-user-delete.usecase';
import { AuthUserUpdateUseCase } from '@Shared/auth/application/use-cases/auth-user-update.usecase';
import { GetUserRoleUseCase } from '@Shared/auth/application/use-cases/get-user-role.usecase';
import { DITokenAuthRepository } from '@Shared/auth/domain/repository/auth-user-repository.ditoken';
import { AuthUserRedisRepository } from '../auth-user-redis.repository';

/** Repositories */
const Repositories = [
	{ provide: DITokenAuthRepository, useClass: AuthUserRedisRepository },
];

/** Query handlers */
const QueryHandlers = [GetAuthUserRoleHandler];

/** Command handlers */
const CommandHandlers = [];

/** Event handlers */
const EventHandlers = [
	UserCreatedHandler,
	UserRoleModifiedHandler,
	UserDeletedHandler,
];

/** Use cases */
const UseCases = [
	AuthUserCreateUseCase,
	GetUserRoleUseCase,
	AuthUserDeleteUseCase,
	AuthUserUpdateUseCase,
];

/** Application service */
const ApplicationServices = [];

/** Domain service */
const DomainServices = [];

/** Graphql resolvers*/
const Resolvers = [];

/** Providers export */
export const BC_AUTH_AUTH_Providers = [
	...Repositories,
	...CommandHandlers,
	...QueryHandlers,
	...EventHandlers,
	...UseCases,
	...ApplicationServices,
	...DomainServices,
	...Resolvers,
];
