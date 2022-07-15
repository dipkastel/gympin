import React, {useEffect, useState} from "react";


export default function Home() {
    const [data,setData] = useState([]);
    useEffect(()=>{
            let url = "http://jsonplaceholder.typicode.com/users";
            fetch(url).then((response)=>{
                response.json().then((result)=>{
                    setData(result);
                })

            })

    },[])
    return (
        <>
            {
                data.map((item,index)=>{

                    console.warn(item.name);
               return <h5 key={index}>Home component - {item.name}</h5>
            })
            }
        </>
    );
}
