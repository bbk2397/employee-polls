import { useEffect } from "react";
import { connect } from "react-redux";
import { handleInitialData } from "../../actions/shared";
import { setPathAfterLogin } from "../../actions/pathAfterLogin";
import LoadingBar from "react-redux-loading-bar";
import Login from "../login/Login";
import Leaderboard from "../leaderboard/Leaderboard";
import Nav from "../nav/Nav";
import Dashboard from "../dashboard/Dashboard";
import NewPoll from "../newPoll/NewPoll";
import PollPage from "../pollPage/PollPage";
import Error404 from "../error404/Error404";
import Logout from "../logout/Logout";
import { Routes, Route } from "react-router-dom";
import { useNavigate, useLocation } from "react-router-dom";
import "./App.css";

export const App = ({ authedUser, users, pathAfterLogin, dispatch }) => {
	const navigate = useNavigate();
	const location = useLocation();
	const path = location.pathname;

	useEffect(() => {
    dispatch(handleInitialData());
	}, [dispatch]);

	useEffect(() => {
		if (!authedUser && path !== '/' && path !== '/logout' && path !== pathAfterLogin) {
			dispatch(setPathAfterLogin(path));
		}
	}, [authedUser, path, dispatch, pathAfterLogin]);

	if (path === '/logout') {
		return (
			<Logout />
		);
	}

	if (!authedUser) {
		if ( path !== '/') {
			navigate('/');
		}

		if ( Object.keys(users).length === 0 ) {
			return (
				<>
					<LoadingBar />
					<div className="redirect-message">
						<div>No authenticated user.</div>
						<div>Redirecting to the login page...</div>
					</div>
				</>
			);
		}
		else {
			return (
				<Login />
			);
		}
	}

	return (
		<>
			<LoadingBar />
			<div className="container">
				<Nav />
				{
					<Routes>
						<Route
							path="/"
							exact
							element={<Dashboard />} />
						<Route
							path="/questions/:question_id"
							element={<PollPage />} />
						<Route
							path="/leaderboard"
							exact
							element={<Leaderboard />} />
						<Route
							path="/add"
							exact
							element={<NewPoll />} />
						<Route 
							path="*"
							element={<Error404 />} />
					</Routes>
				}
			</div>
		</>
	);
};

const mapStateToProps = ({ authedUser, users, pathAfterLogin }) => ({
	authedUser,
	users,
	pathAfterLogin,
});

export default connect(mapStateToProps)(App);
