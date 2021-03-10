import { IEvent } from '@nestjs/cqrs';
import uuid from 'uuid-random';

/**
 * Event wrapper
 */
export abstract class Event<T> implements IEvent {
	/** Event id*/
	public readonly id: string;
	/** Event created at date */
	public readonly ocurredOn: string;

	/**
	 * Creates a new event
	 * @param type Event type
	 * @param attributes Event attributes
	 */
	constructor(public readonly type: string, public readonly attributes: T) {
		this.id = uuid();
		this.ocurredOn = new Date().toUTCString();
	}
}
