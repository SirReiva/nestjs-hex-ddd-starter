export type Instanciable<T> = {
	new (...args: any[]): T;
};
