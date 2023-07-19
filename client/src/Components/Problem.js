import React from 'react';
import Nav from './Nav';
import Editor from './Editor';
import Statement from './Statement';
import { useLocation,useParams } from 'react-router-dom';

function Problem({loginFunction}){
    const location = useLocation();
    const {name , description} = location.state;
    const {id} = useParams();

    return(
        <div className='main-wrapper'>
            <Nav loginFunction={loginFunction}/>
            <div className='main-content'>
              <Statement name={name} description={description}/>
              <Editor id={id}/>
            </div>
        </div>
    )
}

export default Problem;