import { RECEIVE_USERS } from "../actions/users";
import { VOTE_POLL, ADD_POLL } from "../actions/polls";

export default function users(state = [], action) {
  switch (action.type) {
    case RECEIVE_USERS:
      return {
        ...state,
        ...action.users,
			};
		case VOTE_POLL:
			state[action.authedUser].answers[action.qid] = action.answer;

			return {
				...state,
				[action.authedUser]: {
					...state[action.authedUser],
					answers: state[action.authedUser].answers
				},
			};
		case ADD_POLL:
			const { poll } = action;

			return {
				...state,
				[poll.author]: {
					...state[poll.author],
					questions: state[poll.author].questions.concat([poll.id])
				},
			};
    default:
      return state;
  }
} 
