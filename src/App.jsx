import { useEffect, useState } from 'react'
import { BrowserRouter, Routes, Route, Link } from "react-router";

import './App.css'
import List from './components/List';
import InputTask from './components/InputTask';
 
function App() {

  const [Tasks, setTasks] = useState([]);

  useEffect(() =>{
     fetch('https://easydev.club/api/v1/todos', {method: 'GET'})
      .then(response => response.json())
      .then(data => setTasks(data.data))
  },[])


  const postFetch =  (obj) => {
    const requestOptions = {
      method: 'POST',
      body: JSON.stringify(obj)
    }
    fetch('https://easydev.club/api/v1/todos', requestOptions)
      .then(response => {
        if (!response.ok){ throw new Error(response.status) }
        return response.json()
      })
      .then(data => setTasks([...Tasks,data]))
      .catch(error => console.error(error))
  }

  const putFetch = (obj) => {

    const requestOptions = {
      method: 'PUT',
      body: JSON.stringify(obj)
    }
    

    fetch(`https://easydev.club/api/v1/todos/${obj.id}`, requestOptions)
      .then(response => {
        if (!response.ok){ throw new Error(response.status) } 
      })

      .catch(error => console.error(error))
  }
  const deleteFetch = (id) => {

    fetch(`https://easydev.club/api/v1/todos/${id}`, {method: 'DELETE'})
      .then(response => {
        if (!response.ok){
          throw new Error(response.status)
        }
      })
      // .then(data => setTasks([...Tasks,data]))
      .catch(error => console.error(error))
  }

  const onClickButton = (value) => {
    // setTasks([...Tasks, value]);
    postFetch(value);
  }
  
  const onClickDelete = (index) => {
    setTasks(Tasks.filter((obj)=> obj.id !== index))
    deleteFetch(index)
  };

  const changeCheckbox = (id) => {
    setTasks(tasks => 
    tasks.map(task => 
      task.id === id ? 
        { ...task, isDone: !task.isDone }
        : task
    )
  );
  
  const updatedTask = Tasks.find(task => task.id === id);
  if (updatedTask) {
    putFetch({ ...updatedTask, isDone: !updatedTask.isDone });
  }
}

  const changeValue = (id, value) => {
    setTasks(tasks => 
    tasks.map(task => 
      task.id === id ? 
        { ...task, title: value }
        : task
    )
  );

  const updatedTask = Tasks.find(task => task.id === id);
  if (updatedTask) {
    putFetch({ ...updatedTask, title: value });
  }
}

  

  return (
    <>
    <BrowserRouter>
    
      <InputTask onClickButton = { onClickButton }  />
      
        <div>
          <Link to='/'>All</Link>
          <Link to='/atWork'> В процессе</Link>
          <Link to='/done'>Готово</Link>
        </div>
       <Routes>

        <Route path = '/' element = { <List inputList = { Tasks } onClickDelete = { onClickDelete } changeCheckbox = {changeCheckbox} changeValue = {changeValue} />} />
        <Route path = '/atWork' element = { <List inputList = { Tasks } onClickDelete = { onClickDelete } changeCheckbox = {changeCheckbox} changeValue = {changeValue} />} />
        <Route path = '/done' element = { <List inputList = { Tasks } onClickDelete = { onClickDelete } changeCheckbox = {changeCheckbox} changeValue = {changeValue} />} />

        <Route path = '*' element = {<List inputList = { Tasks } onClickDelete = { onClickDelete } changeCheckbox = {changeCheckbox} changeValue = {changeValue} />} />
       </Routes>
     </BrowserRouter>

    </>
  )
}

export default App
