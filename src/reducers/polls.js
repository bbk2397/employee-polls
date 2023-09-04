import { RECEIVE_POLLS, VOTE_POLL, ADD_POLL } from "../actions/polls";

export default function polls(state = {}, action) {
  switch (action.type) {
    case RECEIVE_POLLS:
      return {
        ...state,
        ...action.polls,
      };
		case VOTE_POLL:
      return {
        ...state,
        [action.qid]: {
					...state[action.qid],
					[action.answer]: {
						votes: state[action.qid][action.answer].votes.concat([action.authedUser]),
						text: state[action.qid][action.answer].text,
					}
				},
      };
		case ADD_POLL:
			const { poll } = action;
			
      return {
        ...state,
        [poll.id]: poll,
      };
    default:
      return state;
  }
} 
