import { useState } from "react";


export default function InputTask({ onClickButton }){

    const [inputValue, setInputValue] = useState('');
    const onClick = () =>{
        
        if (inputValue.length >= 2 && inputValue.length <= 64 ){
            onClickButton({
                title : inputValue,
                isDone: false,
            })
        } else {
            console.error('Error');
            
        }
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