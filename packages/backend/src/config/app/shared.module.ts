import { RabbitModule } from '@Config/rabbitmq/rabbitmq.module';
import { IoRedisModule } from '@Config/redis/io-redis.module';
import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { BC_AUTH_AUTH_Providers } from '@Shared/auth/infrastructure/providers/auth.providers';

/**
 * Shared module
 */
@Module({
	imports: [CqrsModule, IoRedisModule, RabbitModule],
	providers: [...BC_AUTH_AUTH_Providers],
})
export class SharedModule {}
