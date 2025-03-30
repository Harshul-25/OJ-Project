import React from "react";
import { API_URL } from "./Api";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function Subcard({id,name,code,verdict,lang,time}){
    const Nav = useNavigate();
    const handleClick = async ()=>{
        const desc = await axios.post(`${API_URL}/getstatement`,{id})
        const description=desc.data;
        sessionStorage.setItem('fromsub',true);
        Nav(`/problem/${id}`,{state: {name,description,code,lang}})
    }

    const map = new Map();
    map.set('cpp','C++'); map.set('py','Python 3'); map.set('c','C');
    const Lang=map.get(lang);

    // Determine verdict class
    let verdictClass = '';
    if (verdict && verdict.toLowerCase().includes('accepted')) {
        verdictClass = 'verdict-accepted';
    } else if (verdict && verdict.toLowerCase().includes('wrong')) {
        verdictClass = 'verdict-wrong';
    } else if (verdict) { // Catch other cases like Error
        verdictClass = 'verdict-error';
    }

    // Format time nicely (optional, but good UX)
    const formattedTime = time ? new Date(time).toLocaleString() : 'N/A';

    return(
    <div className="subcard" onClick={handleClick}>
        <div className="sub-element">{formattedTime}</div>
        <div className="sub-element"> {name} </div>
        <div className="sub-element"> {Lang || lang} </div> {/* Fallback to original lang */} 
        <div className={`sub-element ${verdictClass}`}> {verdict} </div> {/* Add verdict class */} 
    </div>
    )
}