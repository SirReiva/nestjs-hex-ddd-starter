import { Inject } from '@nestjs/common';

/** Event publisher's dependency injection token */
export const DITokenEventPublisher = Symbol('IEventPublisher');

/** Event publisher's dependency injection decorator */
export const InjectEventPublisher = () => Inject(DITokenEventPublisher);
