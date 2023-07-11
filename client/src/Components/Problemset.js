import React from 'react';
import Nav from './Nav';
import Probcard from './Probcard';

export default function Problemset(){
    return(
        <div className='problem-page'>
            <h1> Online Judge </h1>
            <Nav/>
            <div className='problems-wrapper'>
                <Probcard/>
                <Probcard/>
                <Probcard/>
                <Probcard/>
                <Probcard/>
                <Probcard/>
            </div>
        </div>
    )
}