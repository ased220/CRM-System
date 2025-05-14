
export default function List({ inputList }){

    return (
        <>
            {
                !inputList.length ? (
                    <p> Задачи отсутствуют </p>
                ):(
                    inputList.map((value, index)=>{
                        return (
                            <div key={index}>
                                <p>{value}</p>
                            </div>
                        )
                    })
                )

            }
        
        </>
    );
}