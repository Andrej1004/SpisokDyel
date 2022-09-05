import React, {useState} from 'react';
import axios from 'axios';
import {useNavigate} from 'react-router-dom';
import './StartPage.css';

function RegistrationForm({update,login}) {
	const router = useNavigate();
	const [userName,setUserName] = useState('')
	const [userMaile,setUserMaile] = useState('')
	const [userPassword1,setUserPassword1] = useState('')
	const [userPassword2,setUserPassword2] = useState('')
	function sendToServer () {
		console.log(userName+'\n'+userMaile+'\n'+userPassword1+'\n'+userPassword2);
		axios.post("RegisterNewUser/" , {
			csrfmiddlewaretoken: "{{ csrf_token }}",
			name: userName,
			mail: userMaile,
			password1: userPassword1,
			password2: userPassword2,
		})
	.then(function(response) {
		console.log(response.data['isAuth']);
		if (response.data['isAuth']==='yes'){
			window.alert(response.data['msg']);
			update(response.data['isAuth']);
			login(userName);
			router("../app", { replace: true });
		} else {
			window.alert(response.data['msg']);
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
			<p className="subTitle-2" >регистрация</p>
			<input type="text" className="AppInput" placeholder="введите имя" value={userName} onChange={event=>setUserName(event.target.value)} />
			<input type="emaile" className="AppInput" placeholder="введите почту" value={userMaile} onChange={event=>setUserMaile(event.target.value)} />
			<input type="password" className="AppInput" placeholder="пароль" value={userPassword1} onChange={event=>setUserPassword1(event.target.value)} />
			<input type="password" className="AppInput" placeholder="повторите пароль" value={userPassword2} onChange={event=>setUserPassword2(event.target.value)} />
			<button className="AppButton" onClick={sendToServer} >Зарегистрировать</button>
			<button className="AppButton" onClick={exit} >назад</button>
		</div>
	);
}

export default RegistrationForm;