import {
	DEAD_LETTER_EXCHANGE_MQ,
	DOMAIN_EXCHANGE_MQ,
	ERROR_EXCHANGE_MQ,
} from '@Config/rabbitmq/constants/exchange.constant';
import {
	DEAD_LETTER_QUEUE,
	ERROR_QUEUE,
} from '@Config/rabbitmq/constants/queue.constant';
import { AmqpConnection } from '@golevelup/nestjs-rabbitmq';
import { Injectable, Logger } from '@nestjs/common';
import { IEvent } from '@nestjs/cqrs';
import { IEventPublisher } from '@Shared/common/application/interfaces/event-publisher.interface';

/**
 * Rabbit MQ event publisher implementation
 */
@Injectable()
export class RabbitPublisher implements IEventPublisher {
	/**
	 * Creates a new event publisher
	 * @param amqpConnection Connection
	 */
	constructor(private readonly amqpConnection: AmqpConnection) {
		this.amqpConnection.managedChannel.addSetup(async channel => {
			await channel.assertQueue(DEAD_LETTER_QUEUE, {
				deadLetterExchange: DOMAIN_EXCHANGE_MQ,
				messageTtl: 5000,
			});
			await channel.assertQueue(ERROR_QUEUE);

			//Binding exchanges with queues
			await channel.bindQueue(DEAD_LETTER_QUEUE, DEAD_LETTER_EXCHANGE_MQ, '#');
			await channel.bindQueue(ERROR_QUEUE, ERROR_EXCHANGE_MQ, '#');

			channel.on('close', () => {
				Logger.error('Lost connecto to RabbitMQ', '', 'RabbitPublisher');
				process.exit();
			});
		});
	}

	/**
	 * Publishes an event
	 * @param event Event
	 */
	async publish<T extends IEvent>(event: T): Promise<void> {
		await this.amqpConnection.publish(
			DOMAIN_EXCHANGE_MQ,
			event.constructor.name,
			{
				...event,
			}
		);
	}

	/**
	 * Publishes an array of events
	 * @param events Events
	 */
	async publishAll<T extends IEvent>(events: T[]): Promise<void> {
		for (const event of events) {
			await this.publish(event);
		}
	}
}
