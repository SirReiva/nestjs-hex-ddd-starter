import { RabbitMQModule } from '@golevelup/nestjs-rabbitmq';
import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Env } from '@Shared/common/infrastructure/enums/env.enum';
import {
	DEAD_LETTER_EXCHANGE_MQ,
	DOMAIN_EXCHANGE_MQ,
	ERROR_EXCHANGE_MQ,
} from './constants/exchange.constant';

@Module({
	imports: [
		RabbitMQModule.forRootAsync(RabbitMQModule, {
			useFactory: (configService: ConfigService) => ({
				exchanges: [
					{
						name: DOMAIN_EXCHANGE_MQ,
						type: 'topic',
						options: {
							durable: true,
						},
					},
					{
						name: DEAD_LETTER_EXCHANGE_MQ,
						type: 'fanout',
						options: {
							durable: true,
							autoDelete: false,
						},
					},
					{
						name: ERROR_EXCHANGE_MQ,
						type: 'fanout',
						options: {
							durable: true,
							autoDelete: false,
						},
					},
				],
				uri: configService.get(Env.RABBITMQ_URI),
				connectionInitOptions: {
					timeout: Number(configService.get(Env.RABBITMQ_CONN_TIMEOUT)),
					wait: configService.get(Env.NODE_ENV) !== 'dev',
				},
			}),
			inject: [ConfigService],
		}),
	],
	exports: [RabbitMQModule],
})
export class RabbitModule {}
