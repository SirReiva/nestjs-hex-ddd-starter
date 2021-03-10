import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ServeStaticModule } from '@nestjs/serve-static';
import { Env } from '@Shared/common/infrastructure/enums/env.enum';
import { join } from 'path';

@Module({
	imports: [
		ServeStaticModule.forRootAsync({
			imports: [ConfigService],
			useFactory: configService => [
				{
					rootPath: join(
						__dirname,
						'../../../',
						configService.get(Env.UPLOADS_FOLDER)
					),
				},
			],
			inject: [ConfigService],
		}),
	],
})
export class StaticModule {}
