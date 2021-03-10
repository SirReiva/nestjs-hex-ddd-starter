import { RedisModule } from '@nestjs-modules/ioredis';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { Env } from '@Shared/common/infrastructure/enums/env.enum';

@Module({
	imports: [
		RedisModule.forRootAsync({
			imports: [ConfigModule],
			useFactory: (configService: ConfigService) => ({
				config: {
					url: configService.get(Env.REDIS_URI),
				},
			}),
			inject: [ConfigService],
		}),
	],
})
export class IoRedisModule {}
