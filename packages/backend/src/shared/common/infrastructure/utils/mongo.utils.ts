import { CriteriaOperator } from '@Shared/common/domain/enums/criteria-operators.enum';
import { FilterQuery } from 'mongoose';

/**
 * Joins mongo filters based on a logic operator
 * @param filters Filters array
 * @param operator Logic operator
 * @returns Filters joined as a single filter
 */
export const mapMongoFilters = (
	filters?: FilterQuery<any>[],
	operator?: CriteriaOperator
): FilterQuery<any> => {
	if (!filters) return undefined;

	if (filters.length === 1) return filters[0];

	return operator === CriteriaOperator.OR
		? { $or: filters }
		: { $and: filters };
};
