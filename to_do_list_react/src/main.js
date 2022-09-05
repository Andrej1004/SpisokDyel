import React, {useState} from 'react';
import Task from './Task';
import AddTaskForm from './AddTaskForm';
import RegistrationForm from './RegistrationForm';
import App from "./App.js";
import './main.css';
import {BrowserRouter,Route, Routes, Navigate} from "react-router-dom";
import StartPage from "./StartPage";
import EnterPage from "./EnterPage";
import TryApp from "./TryApp";

function Main() {
	const [isAuth,setIsAuth] = useState('no');
	const [login,setLoging] = useState('');
	const updateLogin = (curLogin) => {
		setLoging(curLogin);
	}
	const updateAuth = (state) => {
		setIsAuth(state);
	}
	if (isAuth === 'no') {
		console.log("!!!!!");
		return (
			<BrowserRouter>
			<Routes>
				<Route path="/" element={<StartPage />} ></Route>
				<Route path="/enter" element={<EnterPage update={updateAuth} login={updateLogin} />} ></Route>
				<Route path="/register" element={<RegistrationForm update={updateAuth} login={updateLogin} />} ></Route>
				<Route path="/try" element={<TryApp />} ></Route>
				<Route path="*" element={<Navigate to="/" />} ></Route>
			</Routes>
			</BrowserRouter>
		);
	}
	if (isAuth === 'yes') {
		return (
			<BrowserRouter>
			<Routes>
				<Route path="/app" element={<App update={updateAuth} login={login} />} ></Route>
				<Route path="*" element={<Navigate to="/" />} ></Route>
			</Routes>
			</BrowserRouter>
		);
	}
}

export default Main;
