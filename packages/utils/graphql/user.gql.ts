import { gqldummy as gql } from './dummy-gql';

/** user_login query */
export const user_login = gql`
	query user_login($email: String!, $password: String!) {
		user_login(email: $email, password: $password)
	}
`;

/** user_profile query */
export const user_profile = gql`
	query user_profile {
		user_profile {
			userId
			email
			name
			surname
			role
		}
	}
`;

/** user_find query */
export const user_find = gql`
	query user_find {
		user_find {
			userId
			email
			name
			surname
			role
		}
	}
`;

/** user_find_one query */
export const user_find_one = gql`
	query user_find_one($userId: ID!) {
		user_find_one(userId: $userId) {
			userId
			email
			name
			surname
			role
		}
	}
`;

/** user_create mutation */
export const user_create = gql`
	mutation user_create($input: UserCreateDto!) {
		user_create(input: $input)
	}
`;

/** user_update mutation */
export const user_update = gql`
	mutation user_update($userId: String!, $input: UserUpdateDto!) {
		user_update(userId: $userId, input: $input)
	}
`;

/** user_delete mutation */
export const user_delete = gql`
	mutation user_delete($userId: String!) {
		user_delete(userId: $userId)
	}
`;
