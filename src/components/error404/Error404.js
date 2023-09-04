import "./Error404.css";

const Error404 = () => {
	return (
		<div className="error-404">
			<div className="error">
				<strong>Error 404</strong>: The page for the entered URL was not found.
			</div>
			<div className="hint">
				You have successfully logged in though, so you can navigate throughout the polls app or log out.
			</div>
		</div>
	);
}

export default Error404;