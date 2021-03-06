/**
 * Environment variables
 */
export enum Env {
	/**Application URL */
	SELF_DOMAIN = 'SELF_DOMAIN',
	/** Application PORT */
	PORT = 'PORT',
	/** Uploads folder */
	UPLOADS_FOLDER = 'UPLOADS_FOLDER',
	/** Database URI */
	DATABASE_URI = 'DATABASE_URI',
	/** Redis URI */
	REDIS_URI = 'REDIS_URI',
	/** RabbitMQ URI */
	RABBITMQ_URI = 'RABBITMQ_URI',
	/** RabbitMQ number of retries */
	RABITMQ_RETRIES = 'RABITMQ_RETRIES',
	/** RabbitMQ connection timeout */
	RABBITMQ_CONN_TIMEOUT = 'RABBITMQ_CONN_TIMEOUT',
	/** Node ENV ('dev' or 'production') */
	NODE_ENV = 'NODE_ENV',
	/** Frontend Host */
	HOST_FRONT = 'HOST_FRONT',
	/** User login token expiration */
	USER_TOKEN_EXPIRATION = 'USER_TOKEN_EXPIRATION',
	/** JWT secret key */
	USER_JWT_SECRET = 'USER_JWT_SECRET',
}
