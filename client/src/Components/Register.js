import React from "react"
import { useState } from "react"

export default function Register(){
    const [mail,setMail] = useState('');
    const [pass,setPass] = useState('');
    const [name,setName] = useState('');
    const [ handle,setHandle] = useState('');

    function handleSubmit(e){
        e.preventDefault();
        console.log(e);
    }
    return (
        <div className="form-wrapper">
        <form onSubmit={handleSubmit}>
            <label htmlFor="email">email</label>
            <input value={mail} onChange={(e)=>setMail(e.target.value)} type="email" id="email"/>
            <label htmlFor="name">Full Name</label>
            <input type="name" value={name} onChange={(e)=>setName(e.target.value)} id="name"/>
            <label htmlFor="handle">Handle</label>
            <input type="name" value={handle} onChange={(e)=>setHandle(e.target.value)} id="handle"/>
            <label htmlFor="password">password</label>
            <input value={pass} onChange={(e)=>setPass(e.target.value)} type="password" id="password"/>
            <button type="submit">Register</button>
        </form>
        <button>
            Already have an account? Login here.
        </button>
        </div>
    )
}