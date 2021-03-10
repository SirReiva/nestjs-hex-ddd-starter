/** Common application errors */
export enum CommonErrors {
	NOTHING_TO_MODIFY = 'Nada que modificar',
	FORMAT_INVALID_TITLE = 'Formato de título incorrecto',
	FORMAT_INVALID_DESCRIPTION = 'Formato de descripción incorrecto',

	FORMAT_ARRAY_INDEX = 'Posición de array inválida',
	FORMAT_OBJECT_ID = 'Formato de id inválido',
	FORMAT_URL = 'Formato de url inválido',
	FORMAT_PASSWORD = 'Formato de password inválido',
	FORMAT_EMAIL = 'Formato de email inválido',

	INTERNAL_ERROR = 'Error en el servidor, inténtelo de nuevo más tarde',
	UNAUTHORIZED = 'Operación no permitida',

	EMAIL_IN_USE = 'El email ya está en uso',

	TOKEN_NOT_FOUND = 'Token no encontrado',
	TOKEN_INVALID = 'Token inválido',

	INVALID_LOGIN = 'Login incorrecto',

	FILE_NOT_ALLOWED = 'Tipo de archivo no permitido',
}
