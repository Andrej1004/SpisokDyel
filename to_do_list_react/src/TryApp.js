import React, {useState,useEffect,useMemo} from 'react';
import Task from './Task';
import AddTaskForm from './AddTaskForm';
import RegistrationForm from './RegistrationForm';
import './main.css';
import './App.css';
import {useNavigate} from 'react-router-dom';

function TryApp() {
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
  function AddTask (newTask) {
	setTask([...Tasks, newTask]);
	console.log(newTask)
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
  }
  function deleteTask (id) {
	  setTask(
	  Tasks.filter((task)=>{
		  if (task[0] !== id) {
			  return task;
		  }
	  })
	  );
  }
  const router = useNavigate();
  function exit () {
	  router('../', { replace: true })
  }
  const [show,setShowState] = useState(false);
  function setShowValue () {
	  setShowState(!show);
  }
  return (
    <div className="App">
	  <div className="menu">
		<button className="TaskAppButton" onClick={exit} >выйти</button>
		<button className="TaskAppButton" onClick={setShowValue} >добавить задание</button>
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

export default TryApp;