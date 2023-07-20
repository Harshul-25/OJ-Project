import React from 'react';
import { useNavigate } from 'react-router-dom';
export default function Nav({loginFunction}){
    const handle=sessionStorage.getItem('handle')
    const Nav = useNavigate();
    const handleClick=()=>{Nav("/problemset")}

    const logout=()=>{
        sessionStorage.clear();
        loginFunction()
        Nav('/')
    }
    return(
        <nav className='navbar'>
            <ul className='nav-content'>
                <li onClick={handleClick}>PROBLEMSET</li>
                <li>MY SUBMISSIONS</li>
                <li onClick={()=>{Nav('/ide')}}>IDE</li>
            </ul>
                <div onClick={logout}>Logout</div>
                <div>{handle}</div>
        </nav>
    )
}