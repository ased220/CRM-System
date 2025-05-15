import { useState } from 'react'
import './App.css'
import List from './components/List';
import InputTask from './components/InputTask';

function App() {

  const [Tasks, setTascks] = useState([]);

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
