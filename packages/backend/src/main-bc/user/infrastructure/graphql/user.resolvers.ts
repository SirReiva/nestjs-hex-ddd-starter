import { UserCreateCommand } from '@Main-bc/user/application/commands/user-create.command';
import { UserDeleteCommand } from '@Main-bc/user/application/commands/user-delete.command';
import { UserUpdateCommand } from '@Main-bc/user/application/commands/user-update.command';
import { UserFindOneQuery } from '@Main-bc/user/application/queries/user-find-one.query';
import { UserFindOneResult } from '@Main-bc/user/application/queries/user-find-one.result';
import { UserFindQuery } from '@Main-bc/user/application/queries/user-find.query';
import { UserFindResult } from '@Main-bc/user/application/queries/user-find.result';
import { UserLoginQuery } from '@Main-bc/user/application/queries/user-login.query';
import { UserLoginResult } from '@Main-bc/user/application/queries/user-login.result';
import { UseGuards } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { Args, ID, Mutation, Query, Resolver } from '@nestjs/graphql';
import { JwtService } from '@nestjs/jwt';
import { GetGqlAuthUser } from '@Shared/auth/infrastructure/decorators/get-user.decorator';
import { GqlJwtAuthGuard } from '@Shared/auth/infrastructure/guards/gql-jwt-auth.guard';
import { AuthTokenPayload } from '@Shared/auth/infrastructure/types/auth-token-payload.type';
import { Env } from '@Shared/common/infrastructure/enums/env.enum';
import { UserCreateDto } from './dtos/user-create.dto';
import { UserUpdateDto } from './dtos/user-update.dto';
import { User } from './types/user.gqltype';

/**
 * User graphql queries and mutations
 */
@Resolver()
export class UserResolvers {
	/**
	 * Dependency injection
	 * @param commandBus Command bus
	 * @param queryBus Query bus
	 * @param jwtService JWT Service
	 * @param configService ConfigService
	 */
	constructor(
		private readonly commandBus: CommandBus,
		private readonly queryBus: QueryBus,
		private readonly jwtService: JwtService,
		private readonly configService: ConfigService
	) {}

	/**
	 * Login as user
	 * @param email User's email
	 * @param password User's password
	 */
	@Query(() => ID)
	async user_login(
		@Args('email') email: string,
		@Args('password') password: string
	) {
		const result: UserLoginResult = await this.queryBus.execute(
			new UserLoginQuery(email, password)
		);

		const payload: AuthTokenPayload = {
			id: result.userId,
		};

		return await this.jwtService.signAsync(payload, {
			secret: this.configService.get(Env.USER_JWT_SECRET),
		});
	}

	/**
	 * Find all existing users
	 * @param authorId Author's id
	 */
	@Query(() => [User])
	@UseGuards(GqlJwtAuthGuard)
	async user_find(@GetGqlAuthUser() authorId: string): Promise<User[]> {
		const result: UserFindResult = await this.queryBus.execute(
			new UserFindQuery(authorId)
		);

		return result.users;
	}

	/**
	 * Find a existing user
	 * @param authorId Author's id
	 * @param userId User's id
	 */
	@Query(() => User)
	@UseGuards(GqlJwtAuthGuard)
	async user_find_one(
		@GetGqlAuthUser() authorId: string,
		@Args('userId', { type: () => ID }) userId: string
	): Promise<User> {
		const result: UserFindOneResult = await this.queryBus.execute(
			new UserFindOneQuery(authorId, userId)
		);

		return result;
	}

	/**
	 * Find a profile user
	 * @param authorId Author's id
	 */
	@Query(() => User)
	@UseGuards(GqlJwtAuthGuard)
	async user_profile(@GetGqlAuthUser() authorId: string): Promise<User> {
		const result: UserFindOneResult = await this.queryBus.execute(
			new UserFindOneQuery(authorId, authorId)
		);

		return result;
	}

	/**
	 * Create a new user
	 * @param authorId Author's id
	 * @param input User's data
	 */
	@Mutation(() => Boolean)
	@UseGuards(GqlJwtAuthGuard)
	async user_create(
		@GetGqlAuthUser() authorId: string,
		@Args('input', { type: () => UserCreateDto }) input: UserCreateDto
	): Promise<boolean> {
		const { id, email, name, surname, password, role } = input;

		await this.commandBus.execute(
			new UserCreateCommand(authorId, id, email, name, surname, password, role)
		);

		return true;
	}

	/**
	 * Updates a user
	 * @param authorId Author's id
	 * @param userId User's id
	 * @param input New user's data
	 */
	@Mutation(() => Boolean)
	@UseGuards(GqlJwtAuthGuard)
	async user_update(
		@GetGqlAuthUser() authorId: string,
		@Args('userId') userId: string,
		@Args('input', { type: () => UserUpdateDto! }) input: UserUpdateDto
	): Promise<boolean> {
		const { email, name, surname, password, role } = input;
		await this.commandBus.execute(
			new UserUpdateCommand(
				authorId,
				userId,
				email,
				name,
				surname,
				password,
				role
			)
		);

		return true;
	}

	/**
	 * Delete a user
	 * @param authorId Author's id
	 * @param userId User's id
	 */
	@Mutation(() => Boolean)
	@UseGuards(GqlJwtAuthGuard)
	async user_delete(
		@GetGqlAuthUser() authorId: string,
		@Args('userId') userId: string
	): Promise<boolean> {
		await this.commandBus.execute(new UserDeleteCommand(authorId, userId));

		return true;
	}
}
