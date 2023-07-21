import React from 'react';
import { useState } from 'react';
import axios from 'axios';
export default function Editor({id,name,codecontent}){

    let intial='';
    if(codecontent!==undefined){
        intial=codecontent;
    }

    const [code,setCode] = useState(intial);
    const [input,setInput]=useState('');
    const[output,setOutput]=useState('');
    const [outwindow,setOutwindow]=useState('input')
    
    const handleRun= async (e)=>{
        e.target.disabled=true;
        setOutput("Loading...")
        setOutwindow('output')
        const payload = {
            language: "cpp",
            code: code,
            input: input,
        }
        try {
            const {data} = await axios.post("http://localhost:8000/run", payload)
            setOutput("Output: \n"+data.output)
        } catch (error) {
            // console.log(error.response);
            const msg = error.response.data.err.stderr;
            const e=msg.split("error:")[1];
            setOutput("Compilation or Run time Error:\n"+e)
        }
        e.target.disabled=false;
    }

    const usermail=sessionStorage.getItem('mail')
    const handleSubmit = async (e) =>{
        e.target.disabled=true;
        setOutput("Loading...")
        setOutwindow('output')
        const payload = {
            language: "cpp",
            code: code,
            id: id,
            probname:name,
            mail:usermail
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
        e.target.disabled=false;
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
                {(outwindow==='output')&&<p style={{"white-space":"pre-wrap", overflow:"auto"}}>{output}</p>}
                <div className='submit-btns'>
                <button onClick={(e)=>handleRun(e)}>Run</button>
                <button onClick={(e)=>handleSubmit(e)}>Submit</button>
                </div>
            </div>
        </section>
    )
}