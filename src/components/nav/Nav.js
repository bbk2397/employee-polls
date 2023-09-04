import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { setAuthedUser } from "../../actions/authedUser";
import "./Nav.css";
import { useLocation, useNavigate } from "react-router-dom";

export const Nav = (props) => {
	const location = useLocation();
	const navigate = useNavigate();
	const path = location.pathname;

	const logOut = (e) => {
		e.preventDefault();
		props.dispatch(setAuthedUser(null));
		navigate('/logout');
	}

	const activeStyle = {
		borderBottom: '2px solid #702963',
		borderRadius: '30px',
		padding: '5px',
	};

  return (
		<div className="navbar-grid">
			<nav className="navbar">
				<ul>
					<li>
						<Link
							to="/"
							className="nav-link"
							style={path === "/" ? activeStyle : {}}
						>
							Home
						</Link>
					</li>
					<li>
						<Link
							to="/leaderboard"
							className="nav-link"
							style={path === "/leaderboard" ? activeStyle : {}}
						>
							Leaderboard
						</Link>
					</li>
					<li>
						<Link
							to="/add"
							className="nav-link"
							style={path === "/add" ? activeStyle : {}}
						>
							New Poll
						</Link>
					</li>
				</ul>
			</nav>

			<div className="user-avatar-name">
				<img
						src={props.authedUser.avatarURL}
						alt={`Avatar of ${props.authedUser.name}`}
						className="avatar" />
					
				<div className="auth-user-name">
					{props.authedUser.name}
				</div>
			</div>

			<button
				className="logout-button"
				onClick={logOut}
			>
				Logout
			</button>
		</div>
  );
};

const mapStateToProps = ({ authedUser }) => ({
	authedUser
});

export default connect(mapStateToProps)(Nav);;