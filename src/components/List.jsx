import { useState } from 'react';
import deleteIcon from '../assets/delete.svg'
import EditIcon from '../assets/edit.svg'

export default function List({ inputList, onClickDelete, changeCheckbox, changeValue}){
    const [edit, setEdit] = useState(true);
    const [changeTitle, setChangeTitle] = useState('')
    

    const editTitle = (id ) =>{
        
        setEdit(true);
        changeValue(id, changeTitle)
    }
    return (
        <>
            {
                !inputList.length ? (
                    <p> Задачи отсутствуют </p>
                ):(
                    inputList.map((obj)=>{
                        
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
                                    edit? (
                                        <>
                                            <p>{obj.title}</p>    
                                            <img src={EditIcon} 
                                            onClick = {() => setEdit(false) }
                                            style={{width: '50px', height: '50px', cursor: 'pointer'}} />
                                        </>
                                    ) :(
                                        <>
                                            <input defaultValue={obj.title} onChange={(e) => setChangeTitle(e.target.value)} /> 
                                            <button onClick={ () => editTitle( obj.id ) }> Cохранить </button>
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