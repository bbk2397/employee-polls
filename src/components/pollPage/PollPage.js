import { Navigate } from "react-router-dom";
import "./PollPage.css";
import { connect } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom"
import {
	FaVoteYea,
	FaRegQuestionCircle
} from "react-icons/fa";
import { handleVotePoll } from "../../actions/polls";

const withRouter = (Component) => {
  const ComponentWithRouterApp = (props) => {
    let location = useLocation();
    let navigate = useNavigate();
    let params = useParams();
    
    return <Component {...props} router={{ location, navigate, params }} />;
  };
  
  return ComponentWithRouterApp;
};

const PollPage = ({ isError404, poll, isPollAnsweredByAuthedUser, dispatch, loadingBar }) => {
	if (isError404) {
		return (
			<Navigate to="/error404" />
		);
	}

	const vote = (e) => (option) => {
		dispatch(handleVotePoll({
			qid: poll.id,
			answer: option,
		}));
	}

	return (
		<div className="poll-page-area">
			<h3 className="poll-page-title">
				Poll by {poll.author.name} ({poll.author.id})
			</h3>
			<img
				src={poll.author.avatarURL}
				alt={`Avatar of ${poll.author.name}`}
				className="poll-page-avatar"
			/>
			<h3 className="poll-page-question">
				Would You Rather
			</h3>
			<div className="poll-page-options">
				<div className="poll-page-option">
					<div className="poll-page-option-text">
						{poll.optionOne.text}
					</div>
					<button
						className="poll-page-option-voting-button"
						onClick={e => vote(e)('optionOne')}
						disabled={isPollAnsweredByAuthedUser || loadingBar.default > 0}
					>
						{
							isPollAnsweredByAuthedUser ? 
								(
									poll.optionOne.voters.includesAuthedUser ?
										`Voted!` :
										`Not voted.`
								) :
								`Vote`
						} 
					
					</button>
					{
						isPollAnsweredByAuthedUser ?
							<div className="vote-progress">
								<div><strong>{poll.optionOne.voters.number}</strong> voted for this option.</div>
								<div>This is <strong>{poll.optionOne.voters.percentageFromPollVoters}%</strong> of all voters of this poll,</div>
								<div>and <strong>{poll.optionOne.voters.percentageFromUsers}%</strong> of all users.</div>
							</div> :
							null
					}
				</div>
				<div className="icon-area">
					{ 
						isPollAnsweredByAuthedUser ?
							<FaVoteYea className="icon-vote-yea" /> :
							<FaRegQuestionCircle className="icon-question" />
					}
				</div>
				<div className="poll-page-option">
					<div className="poll-page-option-text">
						{poll.optionTwo.text}
					</div>
					<button
						className="poll-page-option-voting-button"
						onClick={e => vote(e)('optionTwo')}
						disabled={isPollAnsweredByAuthedUser || loadingBar.default > 0}
					>
						{
							isPollAnsweredByAuthedUser ? 
								(
									poll.optionTwo.voters.includesAuthedUser ?
										`Voted!` :
										`Not voted.`
								) :
								`Vote`
						}
					</button>
					{
						isPollAnsweredByAuthedUser ?
							<div className="vote-progress">
								<div><strong>{poll.optionTwo.voters.number}</strong> voted for this option.</div>
								<div>This is <strong>{poll.optionTwo.voters.percentageFromPollVoters}%</strong> of all voters of this poll,</div>
								<div>and <strong>{poll.optionTwo.voters.percentageFromUsers}%</strong> of all users.</div>
							</div> :
							null
					}
				</div>
			</div>
		</div>
	);
}

const mapStateToProps = ({ authedUser, polls, users, loadingBar }, props ) => {
	const { question_id } = props.router.params;

	const isError404 = !Object.keys(polls).includes(question_id);
	if ( isError404 ) {
		return {
			isError404,
		};
	}

	const poll = polls[question_id];
	
	const author = users[poll.author];

	const usersNo = Object.keys(users).length;
	const optionOneVoters = poll.optionOne.votes.length;
	const optionTwoVoters = poll.optionTwo.votes.length;
	const pollVoters = optionOneVoters + optionTwoVoters;
	const optionOnePercentageFromVoters = Math.round(100.0 * optionOneVoters / pollVoters);
	const optionTwoPercentageFromVoters = Math.round(100.0 * optionTwoVoters / pollVoters);
	const optionOnePercentageFromUsers = Math.round(100.0 * optionOneVoters / usersNo);
	const optionTwoPercentageFromUsers = Math.round(100.0 * optionTwoVoters / usersNo);

	const isOptionOneVotedByAuthedUser = poll.optionOne.votes.includes(authedUser.id);
	const isOptionTwoVotedByAuthedUser = poll.optionTwo.votes.includes(authedUser.id);

	const isPollAnsweredByAuthedUser =
		isOptionOneVotedByAuthedUser ||
		isOptionTwoVotedByAuthedUser;

	return {
	  poll: {
			id: poll.id,
			author: {
				id: poll.author,
				name: author.name,
				avatarURL: author.avatarURL,
			},
			optionOne: {
				text: poll.optionOne.text,
				voters: {
					number: optionOneVoters,
					percentageFromPollVoters: optionOnePercentageFromVoters,
					percentageFromUsers: optionOnePercentageFromUsers,
					includesAuthedUser: isOptionOneVotedByAuthedUser,
				}
			},
			optionTwo: {
				text: poll.optionTwo.text,
				voters: {
					number: optionTwoVoters,
					percentageFromPollVoters: optionTwoPercentageFromVoters,
					percentageFromUsers: optionTwoPercentageFromUsers,
					includesAuthedUser: isOptionTwoVotedByAuthedUser
				}
			},
		},
		isPollAnsweredByAuthedUser,
		loadingBar,
	};
};

export default withRouter(connect(mapStateToProps)(PollPage));