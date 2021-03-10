import { Schemas } from '@Config/mongodb/enums/schemas.enum';
import { UserSchema } from '@Config/mongodb/schemas/user.schema';
import { UserRoles } from '@Shared/common/domain/enums/user-roles.enum';
import { hash } from 'bcrypt';
import { config } from 'dotenv';
import { connect, model } from 'mongoose';
import uuid from 'uuid-random';

config();

// TODO: NPM script

/**
 * Admin data
 */
const userData = {
	_id: uuid(),
	email: 'admin@test.com',
	name: 'Miguel Ángel',
	surname: 'Izquierdo',
	password: 'test1234',
	role: UserRoles.ADMIN,
};

/**
 * Creates administrator user if not exists on boot
 */
export const initDB = async () => {
	console.log('\nCreating DB example data\n');

	const connection = await connect(process.env.DATABASE_URI, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
		useFindAndModify: false,
		useCreateIndex: true,
	});

	const userModel = model(Schemas.USERS, UserSchema);

	const existingAdmin = await userModel
		.findOne({ email: userData.email })
		.exec();

	if (!existingAdmin) {
		console.log('Creating admin account...');

		const password = await hash(userData.password, 10);

		await new userModel({ ...userData, password }).save();
	}

	await connection.disconnect();
};
