import { connect } from "react-redux";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { handleAddPoll } from "../../actions/polls";
import { setPathAfterLogin } from "../../actions/pathAfterLogin";
import "./NewPoll.css";

const NewPoll = ({ dispatch, loadingBar }) => {
	const [optionOneText, setOptionOneText] = useState('');
	const [optionTwoText, setOptionTwoText] = useState('');
	const navigate = useNavigate();

	const handleOptionOneChange = (e) => {
		e.preventDefault();
		setOptionOneText(e.target.value);
	}

	const handleOptionTwoChange = (e) => {
		e.preventDefault();
		setOptionTwoText(e.target.value);
	}

	const handleSubmit = (e) => {
		e.preventDefault();
		
		dispatch(handleAddPoll(
			optionOneText,
			optionTwoText,
			() => {
				dispatch(setPathAfterLogin('/'));
				navigate('/')
			}
		));
	}

	return (
		<div className="poll-new-area">
			<h2 className="poll-new-title">
				Would You Rather
			</h2>
			<h4 className="poll-new-subtitle">
				Create Your Own Poll
			</h4>
			<form
				onSubmit={handleSubmit}
				className="poll-new-form"
			>	
				<div className="option-group">
					<label
						htmlFor="option1"
						className="option-label"
					>
						First Option
					</label>
					<input
						type="text"
						name="option1"
						id="option1"
						className="option-input"
						data-testid="option-one-input"
						onChange={handleOptionOneChange}
					/>
				</div>
				<div className="option-group">
					<label
						htmlFor="option2"
						className="option-label"
					>
						Second Option
					</label>
					<input
						type="text"
						name="option2"
						id="option2"
						className="option-input"
						data-testid="option-two-input"
						onChange={handleOptionTwoChange}
					/>
				</div>
				<input
					type="submit"
					value="Create"
					className="create-poll-button"
					data-testid="submit-new-poll"
					disabled={
						optionOneText === "" ||
						optionTwoText === "" ||
						loadingBar.default > 0
					}
				/>
			</form>
		</div>
	);
}

const mapStateToProps = ({ loadingBar }) => ({
	loadingBar,
});

export default connect(mapStateToProps)(NewPoll);