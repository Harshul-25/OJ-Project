import axios from 'axios';
import React from 'react';
import { useNavigate, NavLink, Link } from 'react-router-dom';
import { useTheme } from '../contexts/ThemeContext';

export default function Nav(){
    const handle = sessionStorage.getItem('handle');
    const navigate = useNavigate();
    const { theme, toggleTheme } = useTheme();

    const logout = () => {
        sessionStorage.clear();
        delete axios.defaults.headers.common["Authorization"];
        navigate('/');
    }

    const getNavLinkClass = ({ isActive }) => isActive ? 'active' : '';

    return(
        <div className='nav-wrapper'>
            <nav className='navbar'>
                <Link to="/problemset" className="navbar-brand">OJ Platform</Link>
                <ul className='nav-content'>
                    <li><NavLink to="/problemset" className={getNavLinkClass}>PROBLEMSET</NavLink></li>
                    <li><NavLink to="/submissions" className={getNavLinkClass}>MY SUBMISSIONS</NavLink></li>
                    <li><NavLink to="/ide" className={getNavLinkClass}>IDE</NavLink></li>
                </ul>
                <div className="nav-user-info">
                    <label className="theme-switch" htmlFor="theme-toggle-checkbox">
                        <input 
                            type="checkbox" 
                            id="theme-toggle-checkbox" 
                            onChange={toggleTheme} 
                            checked={theme === 'dark'} 
                        />
                        <span className="theme-slider"></span>
                        <span className="theme-icon theme-icon-light">☀️</span>
                        <span className="theme-icon theme-icon-dark">🌙</span>
                    </label>
                    <div onClick={logout} className="logout-button">Logout</div>
                    <div className="user-handle">{handle}</div>
                </div>
            </nav>
        </div>
    )
}