import React, { useState, useEffect } from 'react';
import Nav from './Nav';
import Editor from './Editor';
import Statement from './Statement';
import { useLocation,useParams } from 'react-router-dom';
import { Panel, PanelGroup, PanelResizeHandle } from "react-resizable-panels";

// Simple hook to check screen width
function useWindowWidth() {
  const [width, setWidth] = useState(window.innerWidth);
  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  return width;
}

function Problem(){
    const location = useLocation();
    const { name, description, code, lang } = location.state || {};
    const {id} = useParams();
    const windowWidth = useWindowWidth();

    const isMobileLayout = windowWidth <= 768;

    return(
        <div className='main-wrapper'>
            <Nav/>
            
            {/* Conditional rendering: Use PanelGroup for desktop, simple divs for mobile */}
            {isMobileLayout ? (
                // Mobile Layout: Simple divs, relies on CSS media queries for stacking
                <div className="main-content-stacked"> 
                    <div className="statement-mobile">
                        <Statement name={name} description={description}/>
                    </div>
                    <div className="editor-mobile"> 
                        <Editor 
                            id={id} 
                            name={name} 
                            initialCode={code}
                            initialLang={lang}
                        />
                    </div>
                </div>
            ) : (
                // Desktop Layout: Resizable Panels
                <PanelGroup 
                    direction="horizontal" 
                    className="main-content-resizable"
                >
                    <Panel defaultSize={50} minSize={20} order={1}>
                        <Statement name={name} description={description}/>
                    </Panel>
                    
                    <PanelResizeHandle className={`resize-handle horizontal`} />

                    <Panel defaultSize={50} minSize={30} order={2}>
                        <Editor 
                            id={id} 
                            name={name} 
                            initialCode={code}
                            initialLang={lang}
                        />
                    </Panel>
                </PanelGroup>
            )}
        </div>
    )
}

export default Problem;