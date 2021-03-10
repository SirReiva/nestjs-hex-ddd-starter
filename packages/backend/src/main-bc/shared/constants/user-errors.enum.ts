/** User error messages */
export enum UserErrors {
	// Application
	USER_NOT_FOUND = 'Usuario no encontrado',
	INVALID_LOGIN = 'Login incorrecto',
	EMAIL_ALREADY_IN_USE = 'El email ya está en uso',
	ID_ALREADY_IN_USE = 'El id de usuario ya está en uso',
	NOTHING_TO_MODIFY = 'Nada que modificar',
	// Domain
	USER_ALREADY_HAS_CLIENT = 'El usuario ya tiene al cliente',
	USER_DONT_HAVE_CLIENT = 'El usuario no tiene al cliente',
	USER_NOT_DELETABLE = 'No se puede eliminar este usuario',
	USER_CAN_NOT_SET_AS_ADMIN = 'No se pueden crear administradores',
	USER_CAN_NOT_MODIFY_ADMIN_ROLE = 'No se puede modificar el rol del administrador',
}
