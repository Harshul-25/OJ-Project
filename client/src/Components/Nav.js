import React from 'react';

export default function Nav(){
    return(
        <nav className='navbar'>
            <ul className='nav-content'>
                <li>PROBLEMSET</li>
                <li>MY SUBMISSIONS</li>
                <li>IDE</li>
                <div className='theme'>Toggle theme</div>

            </ul>
        </nav>
    )
}