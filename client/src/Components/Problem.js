import React from 'react';
import Nav from './Nav';
import Editor from './Editor';
import Statement from './Statement';
import { useLocation,useParams } from 'react-router-dom';

function Problem(){
    const location = useLocation();
    const {name , description, code} = location.state;
    const {id} = useParams();

    return(
        <div className='main-wrapper'>
            <Nav/>
            <div className='main-content'>
              <Statement name={name} description={description}/>
              <Editor id={id} name={name} codecontent={code}/>
            </div>
        </div>
    )
}

export default Problem;