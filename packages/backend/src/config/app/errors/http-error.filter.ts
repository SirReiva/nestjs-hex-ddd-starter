import {
	ArgumentsHost,
	BadRequestException,
	Catch,
	ConflictException,
	ExceptionFilter,
	ForbiddenException,
	HttpException,
	HttpStatus,
	InternalServerErrorException,
	Logger,
	NotAcceptableException,
	NotFoundException,
	UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { GqlContextType } from '@nestjs/graphql';
import { CommonConflictException } from '@Shared/common/exceptions/common-conflict.exception';
import { CommonDuplicateIdentifierException } from '@Shared/common/exceptions/common-duplicate-identifier.exception';
import { CommonForbiddenException } from '@Shared/common/exceptions/common-forbidden.exception';
import { CommonFormatException } from '@Shared/common/exceptions/common-format.exception';
import { CommonNotApplicablenException } from '@Shared/common/exceptions/common-not-applicable.exception';
import { CommonResourceNotFoundException } from '@Shared/common/exceptions/common-resource-not-found.exception';
import { CommonUnauthorizedException } from '@Shared/common/exceptions/common-unauthorized.exception';
import { CommonErrors } from '@Shared/common/infrastructure/enums/common-errors.enum';
import { Env } from '@Shared/common/infrastructure/enums/env.enum';
import { Response } from 'express';

/** Types of caught exceptions */
enum ExceptionTypes {
	/** From GraphQL requests */
	GRAPHQL = 'graphql',
	/** From REST requests */
	HTTP = 'http',
}

/**
 * Catches all the exceptions that occur during the execution of a request, and decides the format in which they should be sent to the client.
 */
@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
	/**
	 * Dependency injection
	 * @param configService Config service
	 */
	constructor(private readonly configService: ConfigService) {}

	/**
	 * Error delegate function
	 *
	 * @param exception Catched exception
	 * @param host Methods to get arguments from execution context
	 */
	catch(exception: Error, host: ArgumentsHost): void {
		const type = host.getType<GqlContextType>();

		const shouldLogStack = this.configService.get(Env.NODE_ENV) === 'dev';

		console.log(exception);

		if (type === ExceptionTypes.GRAPHQL) {
			Logger.error(
				`Error Filter - ${exception.message}`,
				shouldLogStack ? exception.stack : undefined
			);
			if (exception instanceof HttpException) throw exception;
			if (exception instanceof CommonResourceNotFoundException)
				throw new NotFoundException(exception.message);
			if (exception instanceof CommonFormatException)
				throw new BadRequestException(exception.message);
			if (exception instanceof CommonForbiddenException)
				throw new ForbiddenException(exception.message);
			if (exception instanceof CommonUnauthorizedException)
				throw new UnauthorizedException(exception.message);
			if (
				exception instanceof CommonDuplicateIdentifierException ||
				exception instanceof CommonConflictException
			)
				throw new ConflictException(exception.message);
			if (exception instanceof CommonNotApplicablenException)
				throw new NotAcceptableException(exception.message);
			throw new InternalServerErrorException(CommonErrors.INTERNAL_ERROR);
		} else if (type === ExceptionTypes.HTTP) {
			const ctx = host.switchToHttp();
			const response = ctx.getResponse<Response>();
			if (exception instanceof HttpException) {
				let statusCode = exception.getStatus();
				const r = <any>exception.getResponse();
				response.status(statusCode).json(r);
			} else if (exception['code'] === 'ENOENT') {
				response.status(HttpStatus.NOT_FOUND).json();
			} else {
				Logger.error(exception, exception.stack, 'Error Filter');
				response.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
					message: CommonErrors.INTERNAL_ERROR,
					statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
				});
			}
		}
	}
}
