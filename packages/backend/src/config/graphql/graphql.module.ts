import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
	GqlModuleOptions,
	GraphQLModule,
	registerEnumType,
} from '@nestjs/graphql';
import { AutonomousCommunities } from '@Shared/common/domain/enums/autonomous-communities.enum';
import { CriteriaOperator } from '@Shared/common/domain/enums/criteria-operators.enum';
import { CriteriaSortOptions } from '@Shared/common/domain/enums/criteria-sort-options.enum';
import { Provinces } from '@Shared/common/domain/enums/provinces.enum';
import { UserRoles } from '@Shared/common/domain/enums/user-roles.enum';
import { Env } from '@Shared/common/infrastructure/enums/env.enum';
import { graphqlUploadExpress } from 'graphql-upload';
import { join } from 'path';

registerEnumType(Provinces, { name: 'Provinces' });
registerEnumType(AutonomousCommunities, { name: 'AutonomousCommunities' });
registerEnumType(UserRoles, { name: 'UserRoles' });
registerEnumType(CriteriaOperator, { name: 'CriteriaOperator' });
registerEnumType(CriteriaSortOptions, { name: 'CriteriaSortOptions' });

@Module({
	imports: [
		GraphQLModule.forRootAsync({
			useFactory: (configService: ConfigService): GqlModuleOptions => {
				const isDev = configService.get(Env.NODE_ENV) === 'dev';

				return {
					autoSchemaFile: join(__dirname, '../../schema.gql'),
					sortSchema: true,
					debug: isDev,
					playground: isDev,
					tracing: isDev,
					uploads: false,
				};
			},
			inject: [ConfigService],
		}),
	],
	providers: [
		/*DateScalar*/
	],
})
//FIXME Stack maximum excedeed, nest uses old graphql upload, review at update dependencies.
export class GqlModule implements NestModule {
	configure(consumer: MiddlewareConsumer) {
		consumer
			.apply(
				graphqlUploadExpress({
					maxFileSize: 8000000,
					maxFiles: 1,
				})
			)
			.forRoutes('graphql');
	}
}
