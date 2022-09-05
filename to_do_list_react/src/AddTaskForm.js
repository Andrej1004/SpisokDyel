import React, {useState,useMemo} from 'react';
import './AddTaskForm.css';

function AddTaskForm({add,show,setShowState}) {
	let [taskTitle,setTitle]=useState('');
	let [taskText,setTask]=useState('');
	function addTask() {
		add(["waiting",taskTitle, taskText]);
		console.log(taskText+" "+taskTitle);
		setTitle('');
		setTask('');
		setShowState(!show);
	}
	const [currentClass,setCurrentClass] = useState("hideTextForm");
	useMemo(()=>{
	  if (show===true) {
		  setCurrentClass("addTextForm");
	  } else {
		  setCurrentClass("hideTextForm");
	  }
	},[show])
	return (
		<div className={currentClass} >
			<input className="TaskInput" type="Text" placeholder="название задания" onChange={(e) => {setTitle(e.target.value)}} value={taskTitle} />
			<textarea className="TaskInput TaskText" type="Text" placeholder="текст задания" onChange={(e) => {setTask(e.target.value)}} value={taskText} />
			<button className="AddTaskButton" onClick={addTask} >Add</button>
		</div>
	);
}

export default AddTaskForm;