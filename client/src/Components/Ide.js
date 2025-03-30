import React from "react";
import Nav from './Nav'
import { API_URL } from "./Api";
import { useState, useEffect } from 'react';
import axios from 'axios';
import stubs from "./stubs";
import MonacoEditor from '@monaco-editor/react';
import { useTheme } from '../contexts/ThemeContext';

export default function IDE(){
    const { theme } = useTheme();
    const initialLang = 'cpp';
    const [code, setCode] = useState(stubs[initialLang] || stubs.cpp);
    const [input, setInput] = useState('');
    const [output, setOutput] = useState('');
    const [outwindow, setOutwindow] = useState('input');
    const [language, setLanguage] = useState(initialLang);
    const [isRunning, setIsRunning] = useState(false);

    useEffect(()=>{
      setCode(stubs[language] || stubs.cpp);
      setOutput("");
      setOutwindow("input");
    },[language])

    const handleRunClick = async () => {
        setIsRunning(true);
        setOutput("Running your code...");
        setOutwindow('output');
        const payload = {
            language: language,
            code: code,
            input: input
        };
        try {
            const {data} = await axios.post(`${API_URL}/run`, payload);
            setOutput("Output:\n"+data.output);
        } catch (error) {
            let errorMsg = "An unexpected error occurred.";
            if (error.response && error.response.data && error.response.data.err && error.response.data.err.stderr) {
                const stderr = error.response.data.err.stderr;
                const errorLines = stderr.split('\n');
                const specificError = errorLines.find(line => line.toLowerCase().includes('error:')) || stderr;
                errorMsg = `Compilation or Runtime Error:\n${specificError}`;
            } else if (error.message) {
                 errorMsg = `Error: ${error.message}`;
            }
            setOutput(errorMsg);
        }
        setIsRunning(false);
    }

    const editorLanguage = language === 'py' ? 'python' : language;
    const monacoTheme = theme === 'dark' ? 'vs-dark' : 'light';

    return (
        <div className="ide-wrapper">
            <Nav/>
            <section className='ide'>
                <div className="lang">
                    <label>Language:</label>
                    <select
                        value={language}
                        onChange={(e) => {
                            const newLang = e.target.value;
                            if (code !== (stubs[language] || stubs.cpp)) {
                                const shouldSwitch = window.confirm(
                                    "Changing the language will reset your current code. Proceed?"
                                );
                                if (!shouldSwitch) {
                                    return; 
                                }
                            }
                            setLanguage(newLang);
                        }}
                        disabled={isRunning}
                    >
                        <option value="cpp">C++</option>
                        <option value="c">C</option>
                        <option value="py">Python</option>
                    </select>
                </div>
                <div className="ide-editor-container">
                     <MonacoEditor 
                        height="100%" 
                        language={editorLanguage} 
                        theme={monacoTheme}
                        value={code} 
                        onChange={setCode}
                        options={{ 
                            automaticLayout: true, 
                            minimap: { enabled: true }, 
                            fontSize: 14, 
                            wordWrap: 'on', 
                        }} 
                     />
                </div>
                <div className='output'>
                    <div className='output-controls'>
                        <div className='window-btns'>
                            <button onClick={()=>setOutwindow('input')} className={outwindow === 'input' ? 'active' : ''}>Input</button>
                            <button onClick={()=>setOutwindow('output')} className={outwindow === 'output' ? 'active' : ''}>Output</button>
                        </div>
                         <div className='submit-btns'>
                            <button onClick={handleRunClick} disabled={isRunning}>
                                {isRunning ? 'Running...' : 'Run'}
                            </button>
                         </div>
                    </div>
                    <div className="io-editor-container">
                        {/* Conditionally render placeholder for input editor */}
                        {outwindow === "input" && input === "" && (
                            <div className="monaco-placeholder">Enter input here (optional)</div>
                        )}

                        {outwindow === 'input' && (
                           <MonacoEditor
                              height="100%" 
                              language="plaintext"
                              value={input}
                              onChange={setInput}
                              options={{
                                  automaticLayout: true,
                                  minimap: { enabled: false },
                                  fontSize: 13,
                                  wordWrap: 'on', 
                                  lineNumbers: 'off',
                                  scrollBeyondLastLine: false,
                                  readOnly: isRunning,
                              }}
                              theme={monacoTheme}
                           />
                        )}
                        {outwindow === 'output' && (
                           <MonacoEditor
                              height="100%" 
                              language="plaintext"
                              value={output}
                              options={{
                                  automaticLayout: true,
                                  minimap: { enabled: false },
                                  fontSize: 13,
                                  wordWrap: 'on',
                                  readOnly: true, 
                                  lineNumbers: 'off',
                                  scrollBeyondLastLine: false,
                              }}
                              theme={monacoTheme}
                            />
                        )}
                    </div>
                </div>
            </section>
        </div>
    )
}
