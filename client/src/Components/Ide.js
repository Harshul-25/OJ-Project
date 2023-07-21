import React from "react";
import Nav from './Nav'
import { useState } from 'react';
import axios from 'axios';
export default function IDE(){
    const [code,setCode] = useState('');
    const [input,setInput]=useState('');
    const[output,setOutput]=useState('');
    const [outwindow,setOutwindow]=useState('input')
    const handleClick= async (e)=>{
        e.target.disabled=true;
        setOutput("Loading...")
        setOutwindow('output')
        const payload = {
            language: "cpp",
            code: code,
            input: input
        }
        try {
            const {data} = await axios.post("http://localhost:8000/run", payload)
            setOutput("Output: \n"+data.output)
            console.log(data)
        } catch (error) {
            // console.log(error.response);
            const msg = error.response.data.err.stderr;
            const e=msg.split("error:")[1];
            setOutput("Compilation or Run time Error:\n"+e)
        }
        e.target.disabled=false;
    }

    return (<div className="ide-wrapper">
            <Nav/>
        <section className='ide'>
            <textarea onChange={(e)=>setCode(e.target.value)} value={code} placeholder=' Write your code here'></textarea>
            <div className='output'>
                <div className='window-btns'>
                    <button onClick={()=>setOutwindow('input')}>input</button>
                    <button onClick={()=>setOutwindow('output')}>output</button>
                </div>
                {(outwindow==='input')&&<textarea onChange={(e)=>setInput(e.target.value)} value={input} placeholder='input here'></textarea>}
                {(outwindow==='output')&&<p style={{"white-space":"pre-wrap",overflow:"auto"}}>{output}</p>}
                <div className='submit-btns'>
                <button onClick={(e)=>handleClick(e)}>Run</button>
                </div>
            </div>
        </section>
        </div>
    )
}
