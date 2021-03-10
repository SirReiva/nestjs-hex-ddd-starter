import { AllExceptionsFilter } from '@Config/app/errors/http-error.filter';
import { LoggingInterceptor } from '@Config/app/interceptor/logging.interceptor';
import { GqlModule } from '@Config/graphql/graphql.module';
import { MongoDBModule } from '@Config/mongodb/mongodb.module';
import { RabbitModule } from '@Config/rabbitmq/rabbitmq.module';
import { StaticModule } from '@Config/static/static.module';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';
import { MainBcModule } from '../contexts/main.module';
import { SharedModule } from './shared.module';

@Module({
	imports: [
		ConfigModule.forRoot({ isGlobal: true }),
		StaticModule,
		GqlModule,
		MongoDBModule,
		RabbitModule,
		MainBcModule,
		SharedModule,
	],
	providers: [
		{
			provide: APP_FILTER,
			useClass: AllExceptionsFilter,
		},
		{
			provide: APP_INTERCEPTOR,
			useClass: LoggingInterceptor,
		},
	],
})
export class AppModule {}
