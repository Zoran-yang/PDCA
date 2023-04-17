
import React, { useEffect } from 'react';
import {Editor, EditorState, convertFromRaw} from 'draft-js'
import {useState} from 'react';
import "../Component/TaskContentField.css"

const SOPDisplayField = ({sopInfo}) => {
    const [editorState, setEditorState] = useState(() => EditorState.createEmpty());

    const handleStatus = (sopInfo) => {
        setEditorState(EditorState.createWithContent(convertFromRaw(sopInfo)))
    }

    useEffect(() => {
        handleStatus(sopInfo)
    }, [])

    return (
        <>
            <div style={{ 
                    width: "100%" ,
                    background: "#fff",
                    border: "1px solid #ddd",
                    fontFamily: "Georgia serif",
                    boxSizing: "border-box",
                    fontSize: 16,
            }}>

                <div style={{width:"100%", display:"flex", flexWrap:"wrap", borderBottom: "1px solid #ddd", justifyContent: "center"}}>
                    <div >
                        <span>My SOP</span>    
                    </div>
                </div>                  
                <div className="RichEditor-hidePlaceholder" style={{margin:15}}>
                    <Editor
                        blockStyleFn={getBlockStyle}
                        customStyleMap={styleMap}
                        editorState={editorState}
                    />
                </div>
            </div>
        </>
    );
}

export default SOPDisplayField;





const styleMap = {
	CODE: {
		backgroundColor: 'rgba(0, 0, 0, 0.05)',
		fontFamily: '"Inconsolata", "Menlo", "Consolas", monospace',
		fontSize: 16,
		padding: 2,
	},
};


function getBlockStyle(block) {
	switch (block.getType()) {
		case 'blockquote': return 'RichEditor-blockquote';
		case 'new-block-type-name':
			return {
				// component: CustomComponent,
				editable: false,
			}
		default: return null;
	}
}
