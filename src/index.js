import React from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./components/app/App";
import { Provider } from "react-redux";
import store from "./store"
import { BrowserRouter as Router } from "react-router-dom";

const container = document.getElementById('root');
const root = createRoot(container);

root.render(
	<Provider store={ store }>
		<Router>
	    <App />
		</Router>
	</Provider>
);

