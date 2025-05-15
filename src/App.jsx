import { useEffect, useState } from 'react'
import './App.css'
import List from './components/List';
import InputTask from './components/InputTask';

function App() {

  const [Tasks, setTasks] = useState([]);


  useEffect(() =>{
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json'},
      body: JSON.stringify(Tasks)
    }
    fetch('https://easydev.club/api/v1/todos', requestOptions)
      .then(response => response.json())
      .then(data => setTasks(data.data) 
      
      )
  },[Tasks])


  const onClickButton = (value) => {
    setTasks([...Tasks, value]);
  }
  
  const onClickDelete = (index) => {
    setTasks(Tasks.filter((_, ind)=> ind !== index))
  };

  return (
    <>
      <InputTask onClickButton = { onClickButton }  />
      <List inputList = { Tasks } onClickDelete = { onClickDelete } ></List>


    </>
  )
}

export default App
