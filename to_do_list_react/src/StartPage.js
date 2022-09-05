import React, {useState} from 'react';
import './StartPage.css';
import {useNavigate} from 'react-router-dom';

function StartPage() {
	const router = useNavigate();
	return (
		<div className="StartPage">
			<p className="Title" >менеджер заданий</p>
			<button className="AppButton" onClick={()=>router("../enter", { replace: true })} >Войти</button>
			<button className="AppButton" onClick={()=>router("../register", { replace: true })} >Зарегистрироватсья</button>
			<button className="AppButton" onClick={()=>router("../try", { replace: true })} >попробовать без регистрации</button>
		</div>
	);
}

export default StartPage;