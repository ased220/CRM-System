import { useEffect, useState } from 'react'
import './App.css'
import List from './components/List';
import InputTask from './components/InputTask';

function App() {

  const [Tasks, setTascks] = useState([]);


  useEffect(() =>{
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json'},
      body: JSON.stringify(Tasks)
    }
    fetch('/todos', requestOptions)
      .then(response => response.json())
      .then(data => {
        console.log('123');
        return setTascks(data) 
      }
      )
  },[Tasks])


  const onClickButton = (value) => {
    setTascks([...Tasks, value]);
  }
  
  const onClickDelete = (index) => {
    setTascks(Tasks.filter((_, ind)=> ind !== index))
  };

  return (
    <>
      <InputTask onClickButton = { onClickButton }  />
      <List inputList = { Tasks } onClickDelete = { onClickDelete } ></List>


    </>
  )
}

export default App
