import { UserRoles } from '@Shared/common/domain/enums/user-roles.enum';
import { Document } from 'mongoose';

/**
 * Interface for mongoose user's schema
 */
export interface IUser {
	/** User's id */
	_id: string;
	/** User's email */
	email: string;
	/** User's name */
	name: string;
	/** User's surname */
	surname: string;
	/** User's password */
	password: string;
	/** User's role on the platform */
	role: UserRoles;
}

/**
 * Interface for mongoose user's document
 */
export interface IUserDoc extends IUser, Omit<Document, '_id'> {}
