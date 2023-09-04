import { useState } from "react";
import { connect } from "react-redux";
import { setAuthedUser } from "../../actions/authedUser";
import { useNavigate } from "react-router-dom";
import "./Login.css";
import login from "./polls_login.jpg";

const Login = (props) => {
	const navigate = useNavigate();

	const users = Object.values(props.users);

	const [idOfSelectedUser, setIdOfSelectedUser] =
		useState(users[0].id);

	const handleSubmit = (e) => {
		const user = users.find(user =>
			user.id === idOfSelectedUser);

		e.preventDefault();

		props.dispatch(setAuthedUser(user));

		navigate(props.pathAfterLogin);
	}

	const handleChange = (e) => {
		e.preventDefault();
		setIdOfSelectedUser(e.target.value);
	}

	return (
		<div className="login-area">
			<h2 className="login-title">Employee Polls</h2>
			<img
				src={login}
				alt="Login Polls" 
				className="image" />

			<form onSubmit={handleSubmit}>
				<label htmlFor="users" className="user-selection">
					Select a user to impersonate/log in:
				</label>
				<select
					name="users"
					id="users"
					value={idOfSelectedUser}
					onChange={handleChange}
					className="user-selection"
				>
					{
						users.map(user =>
							<option
								key={user.id}
								value={user.id}
							>
								{ user.name }
							</option>
						)
					}
				</select>
				
				<input
					type="submit"
					value="Log in"
					className="user-login" 
				/>
			</form>
		</div>
	);
};

const mapStateToProps = ({ users, pathAfterLogin } ) => ({
	users,
	pathAfterLogin,
});

export default connect(mapStateToProps)(Login);