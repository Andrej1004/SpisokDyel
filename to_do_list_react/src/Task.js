import React, {useState} from 'react';
import './Task.css';

function Task(props) {
  let [editState,SetEditState] = useState(false);
  function ChangeEditState () {
	  SetEditState(!editState);
  }
  let [posState,SetPosState] = useState(props.posState);
  function moveLeft () {
	  if (posState === "today") {
		  SetPosState("waiting");
		  props.change("waiting",props.id);
	  } else if (posState === "waiting") {
		  SetPosState("done");
		  props.change("done",props.id);
	  }
  }
  function moveRight () {
	  if (posState === "done") {
		  SetPosState("waiting");
		  props.change("waiting",props.id);
	  } else if (posState === "waiting") {
		  SetPosState("today");
		  props.change("today",props.id);
	  }
  }
  function getID () {
	  props.del(props.id);
  }
  const [taskTitle,setTitle]=useState(props.title);
  const [taskText,setTask]=useState(props.text);
  function changeTask() {
	props.ChangeTask([taskTitle, taskText],props.id);
	ChangeEditState();
  }
  if ( editState == false ) {
	  return (
		<div className="Task">
		  <p>{props.title}</p>
		  <p>{props.text}</p>
		  <div className="ActionPanel-1">
			<button className="ActionButton" type="button" onClick={moveLeft} >{props.leftButtonTitle}</button>
			<button className="ActionButton" type="button" onClick={ChangeEditState} >изменить</button>
			<button className="ActionButton" type="button" onClick={getID} >удалить</button>
			<button className="ActionButton" type="button" onClick={moveRight} >{props.rightButtonTitle}</button>
		  </div>
		</div>
	  );
  } else {
	  return (
		<div className="Task">
		  <input className="ChangeTaskInput" type="Text" placeholder="название задания" onChange={(e) => {setTitle(e.target.value)}} value={taskTitle} />
		  <textarea className="ChangeTaskInput ChangeTaskText" type="Text" placeholder="текст задания" onChange={(e) => {setTask(e.target.value)}} value={taskText} />
		  <div className="ActionPanel-2">
			<button className="ActionButton" type="button" onClick={changeTask} >сохранить</button>
			<button className="ActionButton" type="button" onClick={ChangeEditState} >отменить</button>
		  </div>
		</div>
	  );
  }
}

export default Task;
