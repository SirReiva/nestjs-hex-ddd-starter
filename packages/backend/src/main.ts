import { AppModule } from '@Config/app/app.module';
import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { Env } from '@Shared/common/infrastructure/enums/env.enum';
import { text as figletText } from 'figlet';
import { initDB } from './init-mongo';

/**
 * Checks if all environment variables are available in proccess.env before boot
 */
const checkEnv = () => {
	Object.keys(Env).forEach(keyEnv => {
		if (!process.env[keyEnv])
			throw new Error(
				`${keyEnv} missing, check the .env.example file and verify that the .env file contains the same variables`
			);
	});
};

/**
 * Start application entrypoint.
 */
async function bootstrap() {
	checkEnv();
	await initDB();
	const app = await NestFactory.create(AppModule);

	const port = process.env[Env.PORT] ? process.env[Env.PORT] : 3000;

	app.enableCors();

	await app.listen(port);
	Logger.log(
		`Application is running on: ${process.env.SELF_DOMAIN} | PORT: ${port}`,
		'Main'
	);

	figletText('Project', function (err: Error, data: any) {
		if (err) return;
		Logger.debug('\n' + data);
	});
}

bootstrap();
