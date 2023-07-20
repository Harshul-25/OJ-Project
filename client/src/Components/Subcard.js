import React from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Subcard({id,name,description}){
    const Nav = useNavigate();
    const handleClick = ()=>{
        
    }

    return(
    <div className="subcard" onClick={handleClick}>
        <div className="sub-element"> Problem </div>
        <div className="sub-element"> Lang </div>
        <div className="sub-element"> Verdict </div>
        <div className="sub-element"> time </div>
    </div>
    )
}