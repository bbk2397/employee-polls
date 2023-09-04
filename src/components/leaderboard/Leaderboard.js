import { connect } from "react-redux";
import "./Leaderboard.css";

const Leaderboard = ({ rows }) => {
	return (
		<div className="leaderboard-area">
			<div className="leaderboard-table">
				<div className="leaderboard-header">
					<div className="header-cell">
						Users
					</div>
					<div className="header-cell">
						Answered
					</div>
					<div className="header-cell">
						Created
					</div>
				</div>
				{
					rows.map(row => 
						<div className="leaderboard-row" key={row.id}>
							<div className="leaderboard-normal-cell">
								<div className="leaderboard-avatar-area">
									<img
										src={row.avatarURL}
										alt={`Avatar of ${row.name}`}
										className="leaderboard-avatar"
									/>
								</div>
								<div>
									<div className="leaderboard-name">
										{ row.name }
									</div>
									<div className="leaderboard-id">
										{ row.id }
									</div>
								</div>
							</div>
							<div className="leaderboard-normal-cell">
								{ row.answerNo }
							</div>
							<div className="leaderboard-normal-cell">
								{ row.questionNo }
							</div>
						</div>
					)
				}
			</div>
		</div>
	);
}

const mapStateToProps = ({ users }) => {
	const rows = Object.values(users).map(user => ({
		avatarURL: user.avatarURL,
		name: user.name,
		id: user.id,
		answerNo: Object.keys(user.answers).length,
		questionNo: user.questions.length,
	})).sort((user1, user2) => user2.answerNo + user2.questionNo - (user1.answerNo + user1.questionNo));

	return {
		rows,
	};
};

export default connect(mapStateToProps)(Leaderboard);