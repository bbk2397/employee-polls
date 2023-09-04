import { useState } from "react";
import { connect } from "react-redux";
import "./Dashboard.css";
import PollsGrid from "./pollsGrid/PollsGrid";

const Dashboard = ({ answeredPolls, unansweredPolls }) => {
	const [displayAnswered, setDisplayAnswered] = useState(false);
	
	const switchDisplay = (e) => {
		e.preventDefault();
		setDisplayAnswered(!displayAnswered);
	};

	return (
		<div className="dashboard-area">
			<button
				onClick={switchDisplay}
				className="switch-display-button"
			>
				Switch Unanswered/Answered
			</button>

			{
				displayAnswered ?
					<>
						<div className="polls-cards-area">
							<h3 className="polls-cards-header-done">Done</h3>
							<PollsGrid polls={answeredPolls} />
						</div>
					</> :
					<>
						<div className="polls-cards-area">
							<h3 className="polls-cards-header-new">New Questions</h3>
							<PollsGrid polls={unansweredPolls} />
						</div>
					</>
			}	
		</div>
	);
}

const mapStateToProps = ({ authedUser, polls }) => {
	const authedUserId = authedUser.id;
	const pollSortPredicate = (poll1, poll2) => 
		poll2.timestamp - poll1.timestamp;
	const isPollAnswered = (poll) =>
		poll.optionOne.votes.includes(authedUserId) ||
		poll.optionTwo.votes.includes(authedUserId);

	const sortedByTimestampPolls = Object
		.values(polls)
		.sort(pollSortPredicate);
	
	const unansweredPolls = sortedByTimestampPolls
		.filter((poll) => !isPollAnswered(poll))
	const answeredPolls = sortedByTimestampPolls
		.filter((poll) => isPollAnswered(poll));

	return {
		answeredPolls,
		unansweredPolls,
	};
};

export default connect(mapStateToProps)(Dashboard);