import React from 'react';
import Nav from './Nav';
import Probcard from './Probcard';
import axios from 'axios';
import { useState, useEffect } from 'react';


export default function Problemset(){

    const [data, setData] = useState([]);

  useEffect(() => {
    // fetch data
    const dataFetch = async () => {
      const data = await (
        await fetch(
          "http://localhost:8000/getAllproblems"
        )
      ).json();

      // set state when the data received
      setData(data);
    };

    dataFetch();
  }, []);

  console.log(data);



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