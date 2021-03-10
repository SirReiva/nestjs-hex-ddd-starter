import { UserCreateHandler } from '@Main-bc/user/application/commands/user-create.handler';
import { UserDeleteHandler } from '@Main-bc/user/application/commands/user-delete.handler';
import { UserUpdateHandler } from '@Main-bc/user/application/commands/user-update.handler';
import { UserFindOneHandler } from '@Main-bc/user/application/queries/user-find-one.handler';
import { UserFindHandler } from '@Main-bc/user/application/queries/user-find.handler';
import { UserLoginHandler } from '@Main-bc/user/application/queries/user-login.handler';
import { UserCreateUseCase } from '@Main-bc/user/application/use-cases/user-create.usecase';
import { UserDeleteUseCase } from '@Main-bc/user/application/use-cases/user-delete.usecase';
import { UserFindOneUseCase } from '@Main-bc/user/application/use-cases/user-find-one.usecase';
import { UserFindUseCase } from '@Main-bc/user/application/use-cases/user-find.usecase';
import { UserLoginUseCase } from '@Main-bc/user/application/use-cases/user-login.usecase';
import { UserUpdateUseCase } from '@Main-bc/user/application/use-cases/user-update.usecase';
import { DITokenUserRepository } from '../../domain/repository/user-repository.ditoken';
import { UserResolvers } from '../graphql/user.resolvers';
import { UserMongoRepository } from '../repository/user-mongo.repository';

/** Repositories */
const Repositories = [
	{ provide: DITokenUserRepository, useClass: UserMongoRepository },
];

/** Query handlers */
const QueryHandlers = [UserLoginHandler, UserFindHandler, UserFindOneHandler];

/** Command handlers */
const CommandHandlers = [
	UserCreateHandler,
	UserUpdateHandler,
	UserDeleteHandler,
];

/** Event handlers */
const EventHandlers = [];

/** Use cases */
const UseCases = [
	UserCreateUseCase,
	UserUpdateUseCase,
	UserDeleteUseCase,
	UserLoginUseCase,
	UserFindUseCase,
	UserFindOneUseCase,
];

/** Application service */
const ApplicationServices = [];

/** Domain service */
const DomainServices = [];

/** Graphql resolvers*/
const Resolvers = [UserResolvers];

/** Providers export */
export const BC_Main_User_Providers = [
	...Repositories,
	...CommandHandlers,
	...QueryHandlers,
	...EventHandlers,
	...UseCases,
	...ApplicationServices,
	...DomainServices,
	...Resolvers,
];
