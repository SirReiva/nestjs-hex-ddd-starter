import { Type } from '@nestjs/common';
import { Field, InputType, Int } from '@nestjs/graphql';
import { CriteriaOperator } from '@Shared/common/domain/enums/criteria-operators.enum';
import { CriteriaFilterDtoClass } from '@Shared/common/infrastructure/graphql/classes/criteria-filter.dto.class';
import { CriteriaSortDtoClass } from './criteria-sort.dto.class';

/** Output class type */
type CriteriaInputDtoClass<
	F extends string | number,
	S extends string | number
> = {
	/** Criteria filters */
	filters?: CriteriaFilterDtoClass<F>[];
	/** Criteria sort */
	sort?: CriteriaSortDtoClass<S>;
	/** Number of elements to skip */
	skip?: number;
	/** Maximum number of elements to retrieve */
	limit?: number;
	/** Criteria operator to join filters */
	operator?: CriteriaOperator;
};

/**
 * Creates a graphql input type for a criteria dto based on a specific enum type
 * @param GraphqlCriteriaFilterInputType Graphql criteria filter input type
 */
export default function CriteriaInputDto<
	F extends string | number,
	S extends string | number
>(
	GraphqlCriteriaFilterInputType: Type<CriteriaFilterDtoClass<F>>,
	GraphqlCriteriaSortInputType: Type<CriteriaSortDtoClass<S>>
): Type<CriteriaInputDtoClass<F, S>> {
	@InputType()
	class _CriteriaDto {
		@Field(() => [GraphqlCriteriaFilterInputType], { nullable: true })
		filters?: CriteriaFilterDtoClass<F>[];

		@Field(() => GraphqlCriteriaSortInputType, { nullable: true })
		sort?: CriteriaSortDtoClass<S>;

		@Field(() => CriteriaOperator, { nullable: true })
		operator?: CriteriaOperator;

		@Field(() => Int, { nullable: true })
		skip?: number;

		@Field(() => Int, { nullable: true })
		limit?: number;
	}

	return _CriteriaDto;
}
