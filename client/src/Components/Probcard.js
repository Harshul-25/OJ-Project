import React from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Probcard({id,name,description}){
    const Nav = useNavigate();
    const handleClick = ()=>{
        Nav(`/problem/${id}`,{state: {name,description}})
    }

    return(
    <div className="pcard" onClick={handleClick}>
        {name}
        <div className="tag">
            Tags here
        </div>
    </div>
    )
}