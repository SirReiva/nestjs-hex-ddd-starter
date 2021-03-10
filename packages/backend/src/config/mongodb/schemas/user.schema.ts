import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { UserRoles } from '@Shared/common/domain/enums/user-roles.enum';

/**
 * Mongoose user's schema definition
 */
@Schema()
export class User {
	/** User's id */
	@Prop({ type: String, required: true, _id: false })
	_id: string;

	/** User's email */
	@Prop({ type: String, required: true, unique: true, index: true })
	email: string;

	/** User's name */
	@Prop({ type: String, required: true })
	name: string;

	/** User's surname */
	@Prop({ type: String, required: true })
	surname: string;

	/** User's hashed password */
	@Prop({ type: String, required: true })
	password: string;

	/** User's role on the platform */
	@Prop({ type: String, enum: Object.values(UserRoles) })
	role: UserRoles;
}

/**
 * Mongoose user's schema object
 */
export const UserSchema = SchemaFactory.createForClass(User);
