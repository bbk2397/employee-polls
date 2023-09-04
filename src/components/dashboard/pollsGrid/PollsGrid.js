import "../Dashboard.css";
import { Link } from "react-router-dom";
import { formatDate } from "../../../utils/helpers";

const PollsGrid = ({ polls }) => {
	return (
		<div className="polls-grid">
			{
				polls.map(poll =>
					<div className="poll-card" key={poll.id}>
						<div className="poll-card-name">{poll.author}</div>
						<div className="poll-card-timestamp">{formatDate(poll.timestamp)}</div>
						<Link
							to={`/questions/${poll.id}`}
							className="show-button">
							Show
						</Link>
					</div>
				)
			}
		</div>
	);
}

export default PollsGrid;