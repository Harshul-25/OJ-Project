import React from "react"
import { useState } from "react"

export default function Login(){
    const [mail,setMail] = useState('');
    const [pass,setPass] = useState('');

    const handleSubmit = (e) =>{
        e.preventDefault();
        console.log(mail);  
        console.log(pass);
    }
    return (
        <div className="form-wrapper">
        <form onSubmit={handleSubmit}>
            <label htmlFor="email">email</label>
            <input value={mail} onChange={(e)=>setMail(e.target.value)} type="email" id="email"/>
            <label htmlFor="password">password</label>
            <input value={pass} onChange={(e)=>setPass(e.target.value)} type="password" id="password"/>
            <button type="submit">Login</button>
        </form>
        <button>
            Don't have a account register here
        </button>
        </div>
    )
}