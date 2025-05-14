import { useState } from 'react'
import './App.css'
import List from './components/List';
import InputTask from './components/InputTask';

function App() {

  const [Tasks, setTascks] = useState([]);

  const onClickButton = (value) => {
    setTascks([...Tasks, value]);
    console.log(Tasks);

  }
  return (
    <>
      <InputTask onClickButton = {onClickButton}  />
      <List inputList = {Tasks} ></List>


    </>
  )
}

export default App
