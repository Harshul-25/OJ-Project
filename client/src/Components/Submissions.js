import React from "react"
import Nav from "./Nav"
import Subcard from "./Subcard"

export default function Submissions(){
    
return(
    <div className='problem-page'>
        <h2> User_handle submissions </h2>
        <Nav/>
        <div className='problems-wrapper'>
            <Subcard/>
            <Subcard/>
            <Subcard/>
            <Subcard/>
        </div>
    </div>
)}