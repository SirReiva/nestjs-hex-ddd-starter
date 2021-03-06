import { AggregateRoot } from '@nestjs/cqrs';

/**
 * Interface that must be implemented by any repository
 */
export interface IRepository<D extends AggregateRoot> {
	/**
	 * Creates a domain entity from database entity
	 * @param persistanceEntity Database entity
	 */
	toDomain(persistanceEntity: any): D;
	/**
	 * Creates a database entity from domain entity
	 * @param domainEntity Domain entity
	 */
	toPersistence(domainEntity: D): any;
}
