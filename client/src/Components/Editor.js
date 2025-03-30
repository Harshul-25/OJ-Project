import React from "react";
import { API_URL } from "./Api";
import { useState} from "react";
import axios from "axios";
import stubs from "./stubs";
import { useTheme } from '../contexts/ThemeContext'; // Import useTheme

// Use Monaco Editor
import MonacoEditor from '@monaco-editor/react';

// Accept initialCode and initialLang as props
export default function Editor({ id, name, initialCode, initialLang }) { 
  
  // Get theme context
  const { theme } = useTheme(); 
  
  // Determine initial language: prop > default ('cpp')
  const defaultLang = initialLang || "cpp";
  // Determine initial code: prop > stub for initial language > default cpp stub
  const defaultCode = initialCode || stubs[defaultLang] || stubs.cpp;

  const [code, setCode] = useState(defaultCode);
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [outwindow, setOutwindow] = useState("input"); 
  const [language, setLanguage] = useState(defaultLang);
  const [isRunning, setIsRunning] = useState(false); 
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Remove the useEffect that resets code on language change,
  // as the initial state setup now handles loading specific code.
  /* 
  useEffect(() => {
    // If initialCode was provided, we don't want this effect to overwrite it on first render
    if (!initialCode) {
       setCode(stubs[language] || stubs.cpp); 
    }
  }, [language, initialCode]);
  */

  // Function to handle language change confirmation and reset
  const handleLanguageChange = (newLang) => {
      // Only confirm if the current code is different from the standard stub for the *current* language
      if (code !== (stubs[language] || stubs.cpp)) {
          const shouldSwitch = window.confirm(
              "Changing the language will reset your current code. Proceed?"
          );
          if (!shouldSwitch) {
              return; // Abort language change
          }
      }
      // If confirmed or code was default stub, proceed with change
      setLanguage(newLang);
      setCode(stubs[newLang] || stubs.cpp); // Reset code to new language stub
      setOutput(""); // Clear output
      setOutwindow("input"); // Reset view
  };

  const handleRun = async () => {
    setIsRunning(true);
    setOutput("Running your code...");
    setOutwindow("output");
    const payload = {
      language: language,
      code: code,
      input: input,
    };
    try {
      const { data } = await axios.post(`${API_URL}/run`, payload);
      setOutput("Output:\n" + data.output);
    } catch (error) {
      console.error("Run Error:", error.response || error);
      // NEW: Extract error message from standardized backend response
      let errorMsg = "An unexpected error occurred.";
      if (error.response?.data?.message) {
          // Message from backend (sanitized compiler error or server error)
          errorMsg = `Error: \n${error.response.data.message}`;
      } else if (error.request) {
          errorMsg = "Error: No response received from server.";
      } else {
          errorMsg = `Error: ${error.message}`;
      }
      setOutput(errorMsg);
      /* --- REMOVE Old Error Parsing ---
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
      */
    }
    setIsRunning(false);
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    setOutput("Submitting your solution...");
    setOutwindow("output");
    const payload = {
      language: language,
      code: code,
      id: id,
      probname: name,
    };
    try {
      const { data } = await axios.post(`${API_URL}/submit`, payload);
      const { accepted, totalcases } = data;
      setOutput(
        `Verdict: ${accepted === totalcases ? 'Accepted' : 'Wrong Answer'}\n` +
        `Details: ${accepted}/${totalcases} test cases passed`
      );
    } catch (error) {
       console.error("Submit Error:", error.response || error);
      // NEW: Extract error message from standardized backend response
      let errorMsg = "An unexpected error occurred during submission.";
      if (error.response?.data?.message) {
          // Message from backend (sanitized compiler error or server error)
          errorMsg = `Error: \n${error.response.data.message}`;
      } else if (error.request) {
          errorMsg = "Error: No response received from server during submission.";
      } else {
          errorMsg = `Submission Setup Error: ${error.message}`;
      }
      setOutput(errorMsg);
      /* --- REMOVE Old Error Parsing ---
      let errorMsg = "An unexpected error occurred during submission.";
      if (error.response && error.response.data && error.response.data.err && error.response.data.err.stderr) {
        const stderr = error.response.data.err.stderr;
        const errorLines = stderr.split('\n');
        const specificError = errorLines.find(line => line.toLowerCase().includes('error:')) || stderr;
        errorMsg = `Compilation or Runtime Error on Submission:\n${specificError}`;
      } else if (error.message) {
        errorMsg = `Submission Error: ${error.message}`;
      }
      setOutput(errorMsg);
      */
    }
    setIsSubmitting(false);
  };

  // Map language for Monaco Editor (used for main editor)
  const editorLanguage = language === 'py' ? 'python' : language;
  const monacoTheme = theme === 'dark' ? 'vs-dark' : 'light'; // Map context theme to Monaco theme

  return (
    <section className="editor">
      <div className="lang">
        <label>Language:</label>
        <select
          value={language}
          onChange={(e) => handleLanguageChange(e.target.value)} 
          disabled={isRunning || isSubmitting}
        >
          <option value="cpp">C++</option>
          <option value="py">Python</option>
          <option value="c">C</option>
        </select>
      </div>
      <div className="editor-container">
          <MonacoEditor
              height="100%"
              language={editorLanguage}
              value={code} 
              onChange={setCode} 
              options={{
                  automaticLayout: true,
                  minimap: { enabled: false }, 
                  fontSize: 14,
                  wordWrap: 'on',
              }}
              theme={monacoTheme} 
          />
      </div>
      <div className="output">
        <div className="output-controls">
            <div className="window-btns">
              <button onClick={() => setOutwindow("input")} className={outwindow === "input" ? 'active' : ''}>Input</button>
              <button onClick={() => setOutwindow("output")} className={outwindow === "output" ? 'active' : ''}>Output</button>
            </div>
             <div className="submit-btns">
              <button onClick={handleRun} disabled={isRunning || isSubmitting}>
                  {isRunning ? 'Running...' : 'Run'}
              </button>
              <button onClick={handleSubmit} disabled={isRunning || isSubmitting}>
                  {isSubmitting ? 'Submitting...' : 'Submit'}
              </button>
            </div>
        </div>
        
        {/* Container for the Input/Output Monaco Editor */}
        <div className="io-editor-container">
            {/* Conditionally render placeholder for input editor */}
            {outwindow === "input" && input === "" && (
                <div className="monaco-placeholder">Enter input here (optional)</div>
            )}

            {outwindow === "input" && (
              <MonacoEditor
                  height="100%" // Fill the container
                  language="plaintext" // Keep it plain
                  value={input}
                  onChange={setInput} // Update input state
                  options={{
                      automaticLayout: true,
                      minimap: { enabled: false }, // No minimap needed
                      fontSize: 13, // Slightly smaller font
                      wordWrap: 'on', 
                      lineNumbers: 'off', // Turn off line numbers
                      scrollBeyondLastLine: false,
                      readOnly: isRunning || isSubmitting, // Read-only while running/submitting
                  }}
                  theme={monacoTheme} // Use theme from context
              />
            )}
            {outwindow === "output" && (
              <MonacoEditor
                  height="100%" // Fill the container
                  language="plaintext" // Keep it plain
                  value={output}
                  options={{
                      automaticLayout: true,
                      minimap: { enabled: false },
                      fontSize: 13,
                      wordWrap: 'on',
                      readOnly: true, // Output is always read-only
                      lineNumbers: 'off',
                      scrollBeyondLastLine: false,
                  }}
                  theme={monacoTheme} // Use theme from context
              />
            )}
        </div>
      </div>
    </section>
  );
}
