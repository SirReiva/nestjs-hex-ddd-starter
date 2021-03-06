import { InternalServerErrorException } from '@nestjs/common';
import { CommonErrors } from '@Shared/common/infrastructure/enums/common-errors.enum';
import { createHook, executionAsyncId } from 'async_hooks';
import { ClientSession, connections } from 'mongoose';

/** Session's map between an ID and a ClientSession */
const map = new Map<number, ClientSession>();

createHook({
	init: function (id, type, triggerAsyncId) {
		const triggeredData = map.get(triggerAsyncId);
		if (triggeredData) {
			map.set(id, triggeredData);
		}
	},
	destroy: function (asyncId) {
		map.delete(asyncId);
	},
}).enable();

/**
 * Method decorator to allow mongo transactions.
 * Create and manage MongoDB session, and wrap method inside a withTransaction function.
 */
export const WithTransaction = (
	_target: any,
	_propertyKey: string,
	descriptor: PropertyDescriptor
) => {
	const originalMethod: (...args: any[]) => any = descriptor.value;

	descriptor.value = async function (...args: any[]) {
		const connection = connections.find(con => con.readyState === 1);
		if (!connection)
			throw new InternalServerErrorException(CommonErrors.INTERNAL_ERROR);
		let session: ClientSession;
		try {
			session = await connection.startSession();
			map.set(executionAsyncId(), session);

			await session.withTransaction(() => {
				return originalMethod.apply(this, [...args]);
			});
		} catch (error) {
			throw error;
		} finally {
			session && session.endSession();
		}
	};
};

/**
 * Gets current mongo ClientSession into a transaction
 * @returns Current ClientSession or undefined
 */
export const getCurrentSession: () => ClientSession | undefined = () =>
	map.get(executionAsyncId());
