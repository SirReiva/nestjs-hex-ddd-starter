import { Inject } from '@nestjs/common';

/** User's repository dependency injection token */
export const DITokenUserRepository = Symbol('IUserRepository');

/** User's repository dependency injection decorator */
export const InjectUserRepository = () => Inject(DITokenUserRepository);
