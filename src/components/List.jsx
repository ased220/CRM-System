import { useState } from 'react';
import deleteIcon from '../assets/delete.svg'
import EditIcon from '../assets/edit.svg'
import { useLocation } from 'react-router';

export default function List({ inputList, onClickDelete, changeCheckbox, changeValue}){
    const [edit, setEdit] = useState( {id: -1, swap: false});
    const [changeTitle, setChangeTitle] = useState('')
    const [inputError, setIputError] = useState('');
    
    let TasksIsDone = inputList;
    const location = useLocation();

    if (location.pathname == '/atWork'){
        TasksIsDone = inputList.filter((element)=> element.isDone == false);

        
    }else if (location.pathname == '/done'){
        TasksIsDone = inputList.filter((element)=> element.isDone == true)
    }

    const editTitle = (id ) =>{
         if (changeTitle.length >= 2 && changeTitle.length <= 64 ){

            setEdit({id: id, swap: true})
            setIputError('')
            changeValue(id, changeTitle)

        } else {
            setIputError('Error')            
        }
        
        
    }
    return (
        <>
            {
                !TasksIsDone.length ? (
                    <p className='noTasks'> Задачи отсутствуют </p>
                ):(
                    TasksIsDone.map((obj)=>{
                        
                        return (
                            <div key={obj.id} className='list'>
                                {
                                    obj.isDone? ( 
                                        <input className='inpCheck' type="checkbox" checked onChange={() => changeCheckbox( obj.id )}></input>
                                        ):(
                                        <input className='inpCheck' type="checkbox" checked = {false} onChange={() => changeCheckbox( obj.id )} ></input>
                                        )
                                }
                                {
                                    edit.id == obj.id?(
                                        edit.swap? (
                                            <>
                                                <p>{obj.title}</p>    
                                                <img src={EditIcon} className='btnList'
                                                onClick = {() => setEdit({id: obj.id, swap: false}) }
                                                 />
                                            </>
                                        ) :(
                                            <>
                                                <div>
                                                    <input className= { inputError == 'Error'? 'editInput input-error': 'editInput'} 
                                                        defaultValue={obj.title} 
                                                        onChange={(e) => setChangeTitle(e.target.value)} 
                                                    /> 
                                                    { inputError == 'Error'? <p className='errorText'> Введите значение от 2 до 64 </p>: ''}
                                                </div>
                                                
                                                <button className='btnList' onClick={ () => editTitle( obj.id ) }> 	&#10004; </button>
                                                <button className='btnList' onClick={ () => setEdit({id: obj.id, swap: true}) }> 	&#10006; </button>
                                            </>
                                        )
                                    ):(
                                        <>
                                        <p>{obj.title}</p>    
                                        <img src={EditIcon} className='btnList'
                                            onClick = {() => setEdit({id: obj.id, swap: false}) }
                                        />
                                        </>
                                    )

                                }
                                <img src={deleteIcon} className='btnList'
                                    onClick = {() => onClickDelete(obj.id)}  
                                />
                            </div>
                        )
                    })
                )
            }
        
        </>
    );
}