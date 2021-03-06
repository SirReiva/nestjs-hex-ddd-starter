import { Type } from '@nestjs/common';
import { Field, InputType } from '@nestjs/graphql';
import { CriteriaSortOptions } from '@Shared/common/domain/enums/criteria-sort-options.enum';

/** Output class type */
export type CriteriaSortDtoClass<T extends string | number> = {
	/** Sort name */
	property: T;
	/** Sort value */
	value: CriteriaSortOptions;
};

/**
 * Creates a graphql input type for a criteria sort based on a specific enum type
 * @param GraphqlPropertyEnum Graphql sort enum
 */
export default function CriteriaSortDto<S extends string | number>(
	GraphqlPropertyEnum: Object
): Type<CriteriaSortDtoClass<S>> {
	@InputType({ isAbstract: true })
	class _CriteriaSortDto {
		@Field(() => GraphqlPropertyEnum)
		property: S;

		@Field(() => CriteriaSortOptions)
		value: CriteriaSortOptions;
	}

	return _CriteriaSortDto;
}
