import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";
import "./Logout.css";
import { useEffect } from "react";
import { setPathAfterLogin } from "../../actions/pathAfterLogin";

const Logout = ({ dispatch }) => {
	const navigate = useNavigate();

	useEffect(() => {
		dispatch(setPathAfterLogin('/'));
	}, [dispatch]);

	const navigateToLoginPage = (e) => {
		e.preventDefault();
		navigate('/');
	}

	return (
		<div className="logout">
			<div className="hint">
				You have successfully logged out!
			</div>
			<button
				onClick={navigateToLoginPage}
				className="login-button"
			>
				Login page
			</button>
		</div>
	);
}

export default connect()(Logout);