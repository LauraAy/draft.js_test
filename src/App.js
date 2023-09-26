import React, { useState, useEffect } from 'react';
import { EditorState, ContentState, richUtils, convertFromHTML } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import {Box, Button} from '@mui/material';
import { convertToHTML } from 'draft-convert';
import DOMPurify from 'dompurify';
import { useForm, controller} from 'react-hook-form';



import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import './App.css';
import './App.css';

function App() {
    // const [editorState, setEditorState] = useState(
    //   () => EditorState.createEmpty(),
    // );

    const ingredientsFromHTML = convertFromHTML(
      "<p>Hey this <strong>editor</strong> rocks 😀</p>"
    );

    const directionsFromHTML = convertFromHTML(
      "<p>Hey this <strong>editor</strong> rocks 😀</p>"
    );
    
    const initialIngredientContent = ContentState.createFromBlockArray(
      ingredientsFromHTML.contentBlocks,
      ingredientsFromHTML.entityMap
    );

    const initialDirectionsContent = ContentState.createFromBlockArray(
      directionsFromHTML.contentBlocks,
      directionsFromHTML.entityMap
    );

    const [ingredientEditorState, setIngredientEditorState] = useState(
      () => EditorState.createWithContent(initialIngredientContent)
    )

    const [directionsEditorState, setDirectionsEditorState] = useState(
      () => EditorState.createWithContent(initialDirectionsContent)
    )

    const [ingredientContent, setIngredientContent] = useState(null);

    const [directionsContent, setDirectionsContent] = useState(null);

    function createMarkup(ingredients_html) {
      return {
        __html: DOMPurify.sanitize(ingredients_html)
      }
    }
  
    useEffect(() => {
      let ingredients_html = convertToHTML(ingredientEditorState.getCurrentContent());
      setValue("ingredients", ingredients_html);
    }, [ingredientEditorState]);

    const {
      register,
      watch,
      handleSubmit,
      setValue,
      formState: { errors }
    } = useForm({
        // values: { title: "test"}
      });
  
  
    // useEffect(() => {
    //   register("title", "description", "servingSize","ingredients", "directions", "source");
    // }, [register]);
  
    const onSubmit = (data) => {
      register("ingredients")
      console.log(data)
    };

    // console.log(convertedContent)
  return (
  <Box mx={20} my={2}>
    <div className="App">
      <header className="App-header">
        Rich Text Editor Example
      </header>

      <Editor
        editorState={ingredientEditorState}
        onEditorStateChange={setIngredientEditorState}
        wrapperClassName="wrapper-class"
        editorClassName="editor-class"
        toolbarClassName="toolbar-class"
      />
        <div
          className="preview"
          dangerouslySetInnerHTML={createMarkup(ingredientContent)}>
        </div>
        <Button onClick={handleSubmit(onSubmit)}>submit</Button>
    </div>
    </Box>
  )
}

export default App;


// import React, { useState, useEffect } from 'react';
// import { EditorState, ContentState, richUtils, convertFromHTML } from 'draft-js';
// import { Editor } from 'react-draft-wysiwyg';
// import {Box, Button} from '@mui/material';
// import { convertToHTML } from 'draft-convert';
// import DOMPurify from 'dompurify';
// import { useForm, controller} from 'react-hook-form';



// import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
// import './App.css';
// import './App.css';

// function App() {
//     // const [editorState, setEditorState] = useState(
//     //   () => EditorState.createEmpty(),
//     // );

//     const blocksFromHTML = convertFromHTML(
//       "<p>Hey this <strong>editor</strong> rocks 😀</p>"
//     );
    
//     const content = ContentState.createFromBlockArray(
//       blocksFromHTML.contentBlocks,
//       blocksFromHTML.entityMap
//     );

//     const [EditorState, setTitleEditorState] = useState(
//       () => EditorState.createWithContent(content)
//     )

//     const [convertedContent, setConvertedContent] = useState(null);

//     function createMarkup(html) {
//       return {
//         __html: DOMPurify.sanitize(html)
//       }
//     }
  
//     useEffect(() => {
//       let html = convertToHTML(editorState.getCurrentContent());
//       setValue("title", html);
//     }, [editorState]);

//     const {
//       register,
//       watch,
//       handleSubmit,
//       setValue,
//       formState: { errors }
//     } = useForm({
//         // values: { title: "test"}
//       });
  
  
//     // useEffect(() => {
//     //   register("title", "description", "servingSize","ingredients", "directions", "source");
//     // }, [register]);
  
//     const onSubmit = (data) => {
//       register("title")
//       console.log(data)
//     };

//     // console.log(convertedContent)
//   return (
//   <Box mx={20} my={2}>
//     <div className="App">
//       <header className="App-header">
//         Rich Text Editor Example
//       </header>

//       <Editor
//         editorState={editorState}
//         onEditorStateChange={setEditorState}
//         wrapperClassName="wrapper-class"
//         editorClassName="editor-class"
//         toolbarClassName="toolbar-class"
//       />
//         <div
//           className="preview"
//           dangerouslySetInnerHTML={createMarkup(convertedContent)}>
//         </div>
//         <Button onClick={handleSubmit(onSubmit)}>submit</Button>
//     </div>
//     </Box>
//   )
// }

// export default App;