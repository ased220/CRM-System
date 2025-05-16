import { useState } from 'react';
import deleteIcon from '../assets/delete.svg'
import EditIcon from '../assets/edit.svg'
import { useLocation } from 'react-router';

export default function List({ inputList, onClickDelete, changeCheckbox, changeValue}){
    const [edit, setEdit] = useState( {id: -1, swap: false});
    const [changeTitle, setChangeTitle] = useState('')
    let TasksIsDone = inputList;
    const location = useLocation();

    if (location.pathname == '/atWork'){
        TasksIsDone = inputList.filter((element)=> element.isDone == false)
        
    }else if (location.pathname == '/done'){
        TasksIsDone = inputList.filter((element)=> element.isDone == true)
    }

    const editTitle = (id ) =>{
        
        setEdit({id: id, swap: true});
        changeValue(id, changeTitle)
    }
    return (
        <>
            {
                !TasksIsDone.length ? (
                    <p> Задачи отсутствуют </p>
                ):(
                    TasksIsDone.map((obj)=>{
                        
                        return (
                            <div key={obj.id}>
                                {
                                    obj.isDone? ( 
                                        <input type="checkbox" checked onChange={() => changeCheckbox( obj.id )}></input>
                                        ):(
                                        <input type="checkbox" checked = {false} onChange={() => changeCheckbox( obj.id )} ></input>
                                        )
                                }
                                {
                                    edit.id == obj.id?(
                                        edit.swap? (
                                            <>
                                                <p>{obj.title}</p>    
                                                <img src={EditIcon} 
                                                onClick = {() => setEdit({id: obj.id, swap: false}) }
                                                style={{width: '50px', height: '50px', cursor: 'pointer'}} />
                                            </>
                                        ) :(
                                            <>
                                                <input defaultValue={obj.title} onChange={(e) => setChangeTitle(e.target.value)} /> 
                                                <button onClick={ () => editTitle( obj.id ) }> Cохранить </button>
                                                <button onClick={ () => setEdit({id: obj.id, swap: true}) }> Отмена </button>
                                            </>
                                        )
                                    ):(
                                        <>
                                        <p>{obj.title}</p>    
                                        <img src={EditIcon} 
                                        onClick = {() => setEdit({id: obj.id, swap: false}) }
                                        style={{width: '50px', height: '50px', cursor: 'pointer'}} />
                                        </>
                                    )

                                }
                                <img src={deleteIcon}
                                    onClick = {() => onClickDelete(obj.id)} 
                                    style={{width: '50px', height: '50px', cursor: 'pointer'} } 
                                />
                            </div>
                        )
                    })
                )
            }
        
        </>
    );
}