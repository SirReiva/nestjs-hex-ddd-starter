import { MongoDBModule } from '@Config/mongodb/mongodb.module';
import { RabbitModule } from '@Config/rabbitmq/rabbitmq.module';
import { BC_Main_User_Providers } from '@Main-bc/user/infrastructure/providers/user.providers';
import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { JwtModule } from '@nestjs/jwt';
import { DITokenEventPublisher } from '@Shared/common/infrastructure/decorators/event-publisher.ditoken';
import { RabbitPublisher } from '@Shared/common/infrastructure/rabbitmq/publisher';

/**
 * Bounded context module: Main
 */
@Module({
	imports: [CqrsModule, MongoDBModule, RabbitModule, JwtModule.register({})],
	providers: [
		{ provide: DITokenEventPublisher, useClass: RabbitPublisher },
		...BC_Main_User_Providers,
	],
})
export class MainBcModule {}
