import { useState } from 'react';
import deleteIcon from '../assets/delete.svg'
import EditIcon from '../assets/edit.svg'
export default function List({ inputList, onClickDelete, changeCheckbox}){
    const [edit, setEdit] = useState(true);
    console.log(inputList);
    
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
                                            <input defaultoValue={obj.title} /> 
                                            <button onClick={ () => setEdit(true) }> Cохранить </button>
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