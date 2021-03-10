import {
	DEAD_LETTER_EXCHANGE_MQ,
	DOMAIN_EXCHANGE_MQ,
	ERROR_EXCHANGE_MQ,
} from '@Config/rabbitmq/constants/exchange.constant';
import { RabbitSubscribe } from '@golevelup/nestjs-rabbitmq';
import { Env } from '@Shared/common/infrastructure/enums/env.enum';
import { Channel, ConsumeMessage } from 'amqplib';

/**
 * Rabbit MQ event suscriber decorator
 * @param context
 * @param event Event class
 * @param handler Handler class
 */
export const EventSubscriber = (
	boundedContext: string,
	event: any,
	handler: any
) =>
	RabbitSubscribe({
		exchange: DOMAIN_EXCHANGE_MQ,
		routingKey: [event.name, `retry-${handler.name}.${event.name}`],
		queue: `${boundedContext}-${handler.name}-${event.name}`,
		errorHandler: async (
			channel: Channel,
			msg: ConsumeMessage,
			_error: any
		) => {
			const retries = Number(
				(msg.properties.headers['x-death'] &&
					msg.properties.headers['x-death'].find(
						item => item.exchange === DOMAIN_EXCHANGE_MQ
					)?.count) ||
					0
			);

			if (retries >= Number(process.env[Env.RABITMQ_RETRIES])) {
				await channel.publish(
					ERROR_EXCHANGE_MQ,
					msg.fields.routingKey,
					msg.content
				);
				return channel.ack(msg);
			} else {
				return await channel.reject(msg, false);
			}
		},
		queueOptions: {
			deadLetterExchange: DEAD_LETTER_EXCHANGE_MQ,
			deadLetterRoutingKey: `retry-${handler.name}.${event.name}`,
		},
	});
