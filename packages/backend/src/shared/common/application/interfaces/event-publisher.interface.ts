import { IEvent } from '@nestjs/cqrs';

/**
 * Event publisher interface
 */
export interface IEventPublisher<EventBase extends IEvent = IEvent> {
	/**
	 * Publishes an event
	 * @param event Event
	 */
	publish<T extends EventBase = EventBase>(event: T): any;
	/**
	 * Publishes an array of events
	 * @param events Events
	 */
	publishAll<T extends EventBase = EventBase>(events: T[]): any;
}
