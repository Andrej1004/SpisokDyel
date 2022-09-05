import React, {useState,useEffect,useMemo} from 'react';
import Task from './Task';
import AddTaskForm from './AddTaskForm';
import RegistrationForm from './RegistrationForm';
import './main.css';
import './App.css';
import {useNavigate} from 'react-router-dom';
import axios from 'axios';

function App({update,login}) {
  const [leftButtonTitle,setLeftButtonTitle]=useState('');
  const [rightButtonTitle,setRightButtonTitle]=useState('');
  function updatebuttonname () {
	  if (windowWidth > 767) {
		  setLeftButtonTitle("влево");
		  setRightButtonTitle("вправо");
	  } else {
		  setLeftButtonTitle("вверх");
		  setRightButtonTitle("вниз");
	  }
  }
  const [windowWidth,setWindowWidth] = useState(window.innerWidth);
  function updateWidth () {
	  setWindowWidth(window.innerWidth);
  }
  useEffect(() => {
    window.addEventListener('resize',updateWidth);
	updatebuttonname ();
	return() => {
		window.removeEventListener('resize',updateWidth);
	}
  },[windowWidth]);
  let [TaskID,setNewId] = useState(0);
  let [Tasks,setTask] = useState([]);
  function GetTasks () {
	  axios.post("GetTasks/" , {
			csrfmiddlewaretoken: "{{ csrf_token }}",
			author: login,
		})
		.then(function(response) {
			let a = 0
			let b = 0
			let data = []
			for (let key in response.data) {
				console.log(key + " " + response.data[key].id + " " + response.data[key].state + " " + response.data[key].title + " " + response.data[key].text);
				data.push([response.data[key].id,response.data[key].state,response.data[key].title,response.data[key].text]);
				a = Number(response.data[key].id)
				if (b < a) {
					b = a
				}
			}
			setNewId(b+1)
			setTask(data)
		})
		.then(function(error) {
			console.log(error);
		})
  }
  useEffect(() => {
    GetTasks ()
  },[]);
  function AddTask (newTask) {
	setTask([...Tasks, newTask]);
	console.log(newTask)
	axios.post("AddNewTask/" , {
			csrfmiddlewaretoken: "{{ csrf_token }}",
			author: login,
			taskID: newTask[0],
			state: newTask[1],
			taskTitle: newTask[2],
			taskText: newTask[3],
		})
		.then(function(response) {
			console.log(response.data['data']);
		})
		.then(function(error) {
			console.log(error);
		})
  }
  function CreateTask (NewTask) {
	AddTask([TaskID, ...NewTask]);
	setNewId(TaskID + 1);
	console.log([TaskID, ...NewTask]);
  }
  function ChangeTask (NewTask,id) {
	  setTask(
	  Tasks.map((task)=>{
		  if (task[0] !== id) {
			  return task;
		  } else {
			  return [task[0],task[1],NewTask[0],NewTask[1]];
		  }
	  })
	  );
	  axios.post("EditTask/" , {
			csrfmiddlewaretoken: "{{ csrf_token }}",
			author: login,
			taskID: id,
			taskTitle: NewTask[0],
			taskText: NewTask[1],
		})
		.then(function(response) {
			console.log(response.data);
		})
		.then(function(error) {
			console.log(error);
		})
  }
  function SetPosState (curPosState,id) {
	  setTask(
	  Tasks.map((task)=>{
		  if (task[0] !== id) {
			  return task;
		  } else {
			  return [id, curPosState, task[2], task[3] ];
		  }
	  })
	  );
	  axios.post("SetNewTaskState/" , {
			csrfmiddlewaretoken: "{{ csrf_token }}",
			author: login,
			taskID: id,
			state: curPosState,
		})
		.then(function(response) {
			console.log(response.data);
		})
		.then(function(error) {
			console.log(error);
		})
  }
  function deleteTask (id) {
	  setTask(
	  Tasks.filter((task)=>{
		  if (task[0] !== id) {
			  return task;
		  }
	  })
	  );
	  axios.post("DeleteTask/" , {
			csrfmiddlewaretoken: "{{ csrf_token }}",
			author: login,
			taskID: id,
		})
		.then(function(response) {
			console.log(response)
		})
		.then(function(error) {
			console.log(error);
		})
  }
  const router = useNavigate();
  function exit () {
	  update("no")
	  router('../', { replace: true })
  }
  const [show,setShowState] = useState(false);
  function setShowValue () {
	  setShowState(!show);
  }
  function deleteAccount () {
	  let res = window.confirm("вы точно хотите удалить вашу учётную запись?");
	  if (res) {
		  axios.post("DeleteAccount/" , {
				csrfmiddlewaretoken: "{{ csrf_token }}",
				author: login,
			})
			.then(function(response) {
				console.log(response);
				update("no")
				router('../', { replace: true })
			})
			.then(function(error) {
				console.log(error);
			})
	  }
  }
  return (
    <div className="App">
      <div className="menu">
		<button className="TaskAppButton" onClick={exit} >выйти</button>
		<button className="TaskAppButton" onClick={setShowValue} >добавить задание</button>
		<button className="TaskAppButton" onClick={deleteAccount} >удалить пользователя</button>
	  </div>
      <AddTaskForm add={CreateTask} show={show} setShowState={setShowState} />
	  <div className="container">
		  <div id="done">
			<p className="blockTitle">Сделано:</p>
			{
			  Tasks.map((task)=> {
				  if (task[1] === "done") {
				  return (<Task posState={task[1]} title={task[2]} text={task[3]} id={task[0]} change={SetPosState} del={deleteTask} ChangeTask={ChangeTask} leftButtonTitle={leftButtonTitle} rightButtonTitle={rightButtonTitle} />);
					}
				 })
			}
		  </div>
		  <div id="waiting">
			<p className="blockTitle">Запланированно:</p>
			{
			  Tasks.map((task)=> {
				  if (task[1] === "waiting") {
					  return (<Task posState={task[1]} title={task[2]} text={task[3]} id={task[0]} change={SetPosState} del={deleteTask} ChangeTask={ChangeTask} leftButtonTitle={leftButtonTitle} rightButtonTitle={rightButtonTitle} />);
					}
				 })
			}
		  </div>
		  <div id="today">
			<p className="blockTitle">На сегодня:</p>
			{
			  Tasks.map((task)=> {
				  if (task[1] === "today") {
					  return (<Task posState={task[1]} title={task[2]} text={task[3]} id={task[0]} change={SetPosState} del={deleteTask} ChangeTask={ChangeTask} leftButtonTitle={leftButtonTitle} rightButtonTitle={rightButtonTitle} />);
					}
				 })
			}
		  </div>
	  </div>
    </div>
  );
}

export default App;
