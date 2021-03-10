import { VOFormatException } from '../exceptions/vo-format.exception';

/**
 * Employee's find by criteria pagination value object
 */
export class VOPagination {
	/**
	 * Creates a find by criteria pagination value object
	 * @param skip Number of elements to skip
	 * @param limit Number of elements to retrieve
	 */
	constructor(public readonly skip: number, public readonly limit: number) {
		if (
			skip < 0 ||
			limit < 0 ||
			Math.floor(skip) !== skip ||
			Math.floor(limit) !== limit
		)
			throw new VOFormatException('Pagination');
	}
}
