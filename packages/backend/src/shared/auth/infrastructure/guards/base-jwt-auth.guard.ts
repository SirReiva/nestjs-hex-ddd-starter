import {
	CanActivate,
	ExecutionContext,
	Injectable,
	UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { AuthTokenPayload } from '@Shared/auth/infrastructure/types/auth-token-payload.type';
import { CommonErrors } from '@Shared/common/infrastructure/enums/common-errors.enum';
import { Env } from '@Shared/common/infrastructure/enums/env.enum';

/**
 * Abstract JWT auth guard
 */
@Injectable()
export abstract class BaseJwtAuthGuard implements CanActivate {
	/**
	 * Dependency injection
	 * @param jwtservice JWT service
	 * @param configService Config service
	 */
	constructor(
		protected readonly jwtservice: JwtService,
		private readonly configService: ConfigService
	) {}

	/**
	 * Gets HTTP request from context
	 * @param context Excecution context
	 */
	abstract getRequest(context: ExecutionContext): any;

	/**
	 * Checks if a user is authorized and sets it to req.user
	 * @param context Execution context
	 */
	async canActivate(context: ExecutionContext) {
		const req = this.getRequest(context);

		const bearerToken: string = req.headers.authorization;

		if (!bearerToken)
			throw new UnauthorizedException(CommonErrors.UNAUTHORIZED);

		const token = bearerToken.replace('Bearer ', '');

		try {
			const payload: AuthTokenPayload = await this.jwtservice.verifyAsync(
				token,
				{
					secret: this.configService.get(Env.USER_JWT_SECRET),
				}
			);

			req.user = payload.id;
		} catch (error) {
			throw new UnauthorizedException(CommonErrors.UNAUTHORIZED);
		}

		return true;
	}
}
