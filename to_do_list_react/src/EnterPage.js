import React, {useState} from 'react';
import axios from 'axios';
import {useNavigate} from 'react-router-dom';
import './StartPage.css';

function EnterPage({update,login}) {
	const router = useNavigate();
	const [userName,setUserName] = useState('')
	const [userPassword,setUserPassword] = useState('')
	function sendToServer () {
		console.log(userName+'\n'+userPassword);
		axios.post("Login/" , {
			csrfmiddlewaretoken: "{{ csrf_token }}",
			name: userName,
			password: userPassword,
		})
	.then(function(response) {
		console.log(response.data['isAuth']);
		if (response.data['isAuth']==='yes'){
			update(response.data['isAuth']);
			login(userName);
			router("../app", { replace: true });
		} else {
			window.alert("вы ввели неверный логин или пароль. попробуйте еще раз.");
		}
	})
	.then(function(error) {
		console.log(error);
	})
	}
	function exit () {
	  router('../', { replace: true })
	}
	return (
		<div className="StartPage">
			<p className="subTitle-1" >авторизация</p>
			<input type="text" className="AppInput" placeholder="введите логин" value={userName} onChange={event=>setUserName(event.target.value)} />
			<input type="password" className="AppInput" placeholder="введите пароль" value={userPassword} onChange={event=>setUserPassword(event.target.value)} />
			<button className="AppButton" onClick={sendToServer} >войти</button>
			<button className="AppButton" onClick={exit} >назад</button>
		</div>
	);
}

export default EnterPage;