import React from 'react';
import { useState } from 'react';
import axios from 'axios';
export default function Editor({id}){
    const [code,setCode] = useState('');
    const [input,setInput]=useState('');
    const[output,setOutput]=useState('');
    const [outwindow,setOutwindow]=useState('input')
    const handleClick= async ()=>{
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
    }

    const handleSubmit = async () =>{
        setOutput("Loading...")
        setOutwindow('output')
        const payload = {
            language: "cpp",
            code: code,
            id: id
        }
        try {
            const {data} = await axios.post("http://localhost:8000/submit", payload)
            const {accepted, totalcases}=data;
            if(accepted===totalcases){
                setOutput(`Verdict: Accepted\nDetails: ${accepted}/${totalcases} test cases passed`)
            }
            else{
                setOutput(`Verdict: Wrong Answer\nDetails: ${accepted}/${totalcases} test cases passed`)
            }
        } catch (error) {
            // console.log(error.response);
            const msg = error.response.data.err.stderr;
            const e=msg.split("error:")[1];
            setOutput("Compilation or Run time Error:\n"+e)
        }
    }

    return (
        <section className='editor'>
            <textarea onChange={(e)=>setCode(e.target.value)} value={code} placeholder=' Write your code here'></textarea>
            <div className='output'>
                <div className='window-btns'>
                    <button onClick={()=>setOutwindow('input')}>input</button>
                    <button onClick={()=>setOutwindow('output')}>output</button>
                </div>
                {(outwindow==='input')&&<textarea onChange={(e)=>setInput(e.target.value)} value={input} placeholder='input here'></textarea>}
                {(outwindow==='output')&&<p style={{"white-space":"pre-wrap"}}>{output}</p>}
                <div className='submit-btns'>
                <button onClick={handleClick}>Run</button>
                <button onClick={handleSubmit}>Submit</button>
                </div>
            </div>
        </section>
    )
}