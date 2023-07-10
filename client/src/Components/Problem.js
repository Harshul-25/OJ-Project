import React from 'react';
import Nav from './Nav';
import Editor from './Editor';
import Statement from './Statement';

function Problem(){
    return(
        <div className='main-wrapper'>
            <Nav/>
            <div className='main-content'>
              <Statement/>
              <Editor/>
            </div>
        </div>
    )
}

export default Problem;