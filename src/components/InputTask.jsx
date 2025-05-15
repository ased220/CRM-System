import { useState } from "react";


export default function InputTask({ onClickButton }){

    const [inputValue, setInputValue] = useState('');
    const onClick = () =>{
        onClickButton({
            title : inputValue,
            isDone: false,
        })
    }
    return (
        <>
            <input 
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder='Task to be done...' 
            />
            <button onClick={ () => onClick() }>Add</button>
        </>
    )
}