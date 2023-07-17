import React from 'react';
import { useNavigate } from 'react-router-dom';
export default function Nav(){
    const Nav = useNavigate();
    const handleClick=()=>{Nav("/problemset")}
    return(
        <nav className='navbar'>
            <ul className='nav-content'>
                <li onClick={handleClick}>PROBLEMSET</li>
                <li>MY SUBMISSIONS</li>
                <li>IDE</li>
                <div className='theme'>Toggle theme</div>

            </ul>
        </nav>
    )
}