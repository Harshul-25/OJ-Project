import React from 'react';
import Nav from './Nav';
import Editor from './Editor';
import Statement from './Statement';
import { useLocation } from 'react-router-dom';

function Problem(){
    const location = useLocation();
    const {name , description} = location.state;

    return(
        <div className='main-wrapper'>
            <Nav/>
            <div className='main-content'>
              <Statement name={name} description={description}/>
              <Editor/>
            </div>
        </div>
    )
}

export default Problem;