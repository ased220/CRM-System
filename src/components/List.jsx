import { useState } from 'react';
import deleteIcon from '../assets/delete.svg'
import EditIcon from '../assets/edit.svg'
export default function List({ inputList, onClickDelete}){
    const [edit, setEdit] = useState(true);

    // const handleText = () =>{
    //     setEdit(true);
    // }
    // const handleInput = () => {
    //     setEdit(false);
    // }
    return (
        <>
            {
                !inputList.length ? (
                    <p> Задачи отсутствуют </p>
                ):(
                    inputList.map((value, index)=>{
                        return (
                            <div key={index}>
                                <input type="checkbox"></input>
                                {
                                    edit? (
                                        <>
                                            <p>{value}</p>
                                            <img src={EditIcon} 
                                            onClick = {() => setEdit(false) }
                                            style={{width: '50px', height: '50px', cursor: 'pointer'}} />
                                        </>
                                    ) :(
                                        <>
                                            <input defaultValue={value} /> 
                                            <button onClick={ () => setEdit(true) }> Cохранить </button>
                                        </>
                                    )
                                }
                                    <img src={deleteIcon}
                                        onClick = {() => onClickDelete(index)} 
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