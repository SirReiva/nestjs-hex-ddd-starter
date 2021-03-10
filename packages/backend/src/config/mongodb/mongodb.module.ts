import { Schemas } from '@Config/mongodb/enums/schemas.enum';
import { UserSchema } from '@Config/mongodb/schemas/user.schema';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule, MongooseModuleOptions } from '@nestjs/mongoose';
import { Env } from '@Shared/common/infrastructure/enums/env.enum';

/**
 * Mongoose module, to manage database connection and model definitions
 */
@Module({
	imports: [
		MongooseModule.forRootAsync({
			imports: [ConfigModule],
			useFactory: (configService: ConfigService): MongooseModuleOptions => ({
				uri: configService.get(Env.DATABASE_URI),
				useNewUrlParser: true,
				useUnifiedTopology: true,
				useFindAndModify: false,
				useCreateIndex: true,
			}),
			inject: [ConfigService],
		}),
		MongooseModule.forFeature([{ name: Schemas.USERS, schema: UserSchema }]),
	],
	exports: [MongooseModule],
})
export class MongoDBModule {}
