import { saveQuestion, saveQuestionAnswer } from "../utils/api";
import { showLoading, hideLoading } from "react-redux-loading-bar";
  
export const RECEIVE_POLLS = "RECEIVE_POLLS";
export const ADD_POLL = "ADD_POLL";
export const VOTE_POLL = "VOTE_POLL";

function addPoll(poll) {
  return {
    type: ADD_POLL,
    poll,
  };
}

export function handleAddPoll(optionOneText, optionTwoText, cb) {
  return (dispatch, getState) => {
		dispatch(showLoading());

		const { authedUser } = getState();

    return saveQuestion({
			optionOneText,
			optionTwoText,
      author: authedUser.id
    })
      .then((poll) => dispatch(addPoll(poll)))
			.then(() => dispatch(hideLoading()))
			.then(() => cb())
			.catch((e) => {
        console.warn("Error in handleAddPoll: ", e);
				alert("There was an error adding the poll. Try again.");
				dispatch(hideLoading());
			});
  };
}

export function receivePolls(polls) {
  return {
    type: RECEIVE_POLLS,
    polls,
  };
}

function votePoll({ authedUser, qid, answer }) {
  return {
		type: VOTE_POLL,
		authedUser,
		qid,
		answer,
  };
}

export function handleVotePoll(info) {
  return (dispatch, getState) => {
		dispatch(showLoading());

		const { authedUser } = getState();
		info['authedUser'] = authedUser.id;

		return saveQuestionAnswer(info)
			.then((poll) => dispatch(votePoll(info)))
			.then(() => dispatch(hideLoading()))
      .catch((e) => {
        console.warn("Error in handleVotePoll: ", e);
        alert("There was an error voting the poll. Try again.");
    });
  };
}