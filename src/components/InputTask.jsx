import { useState } from "react";


export default function InputTask({ onClickButton }){

    const [inputValue, setInputValue] = useState('');
    const [inputError, setIputError] = useState('');
    const onClick = () =>{
        
        if (inputValue.length >= 2 && inputValue.length <= 64 ){

            onClickButton({
                title : inputValue,
                isDone: false,
            })
            setIputError('')
        } else {
            setIputError('Error')            
        }
    }

    return (
        <div className="inputTask">
            <div>

                <input 
                    className= { inputError == 'Error'? 'input-error': ''}
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    placeholder='Task to be done...' 
                />
                { inputError == 'Error'? <p className="errorText"> Введите значение от 2 до 64 </p>: ''}
                
            </div>
            <button onClick={ () => onClick() }>Add</button>
        </div>
    )
}