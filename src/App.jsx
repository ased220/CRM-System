import { useEffect, useState } from 'react'
import { BrowserRouter, Routes, Route, Link, NavLink } from "react-router";

import List from './components/List';
import InputTask from './components/InputTask';
 
function App() {

  const [Tasks, setTasks] = useState([]);
  const [activeLink, setActiveLink] = useState('/')
  const [countTasks, setCountTasks] = useState([0,0,0])

  useEffect(() =>{
     fetch('https://easydev.club/api/v1/todos', {method: 'GET'})
      .then(response => response.json())
      .then(data => setTasks(data.data))
  },[])

  useEffect(()=>{

    const filter = Tasks.filter(element => element.isDone === true).length
    setCountTasks([Tasks.length, filter, Tasks.length - filter ])
    
  },[Tasks])

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

  const changeStyle = (path) =>{
    setActiveLink(path);
  }

  

  return (
    <>
    <BrowserRouter>
      
      <InputTask onClickButton = { onClickButton }  />

        <div className='link'>
          <Link to='/' 
            id={ activeLink == '/'? 'active': ' '}
            onClick={() => changeStyle('/')}
          >{ `Все (${countTasks[0]})` }</Link>

          <Link to='/atWork'
            id={ activeLink == '/atWork'? 'active': ''}
            onClick={() => changeStyle('/atWork')}
          > { `В процессе (${countTasks[2]})` }</Link>

          <Link to='/done'
            id={ activeLink == '/done'? 'active': ''}
            onClick={() => changeStyle('/done')}
          > { `Готово (${countTasks[1]})` } </Link>
         
        </div>
       <Routes>

        <Route path = '*' element = {<List inputList = { Tasks } onClickDelete = { onClickDelete } changeCheckbox = {changeCheckbox} changeValue = {changeValue} />} />
        {/* и без нижней части работает, но мб лучше с ней писать , короче понял зачем нужна нижняя часть но пока оставлю так*/}
        {/* <Route path = '/' element = { <List inputList = { Tasks } onClickDelete = { onClickDelete } changeCheckbox = {changeCheckbox} changeValue = {changeValue} />} /> */}
        {/* <Route path = '/atWork' element = { <List inputList = { Tasks } onClickDelete = { onClickDelete } changeCheckbox = {changeCheckbox} changeValue = {changeValue} />} />
        <Route path = '/done' element = { <List inputList = { Tasks } onClickDelete = { onClickDelete } changeCheckbox = {changeCheckbox} changeValue = {changeValue} />} /> */}

       </Routes>
     </BrowserRouter>

    </>
  )
}

export default App
