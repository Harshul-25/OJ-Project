import React from 'react';
import { useState } from 'react';
import axios from 'axios';
export default function Editor(){

    const [code,setCode] = useState('');
    const [input,setInput]=useState('');

    const handleClick= async ()=>{
        const payload = {
            language: "cpp",
            code: code,
            input: input
        }
        try {
            const {data} = await axios.post("http://localhost:8000/run", payload)
            setInput("Output: \n"+data.output)
            console.log(data)
        } catch (error) {
            // console.log(error.response);
            const msg = error.response.data.err.stderr;
            const e=msg.split("error:")[1];
            setInput("Compilation or Run time Error:\n"+e)
        }
    }

    return (
        <section className='editor'>
            <textarea onChange={(e)=>setCode(e.target.value)} value={code} placeholder=' Write your code here'></textarea>
            <div className='output'>
                <textarea onChange={(e)=>setInput(e.target.value)} value={input} placeholder='input here'></textarea>
                <button onClick={handleClick}>Run</button>
                <button>Submit</button>
            </div>
        </section>
    )
}