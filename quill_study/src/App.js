import './App.css';
import ReactQuill from 'react-quill';
import { useCallback, useState } from 'react';

function App() {

  const modules = {
    toolbar: [
      ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
      ['blockquote', 'code-block'],
      ['link', 'image', 'video', 'formula'],

      [{ 'header': 1 }, { 'header': 2 }],               // custom button values
      [{ 'list': 'ordered'}, { 'list': 'bullet' }, { 'list': 'check' }],
      [{ 'script': 'sub'}, { 'script': 'super' }],      // superscript/subscript
      [{ 'indent': '-1'}, { 'indent': '+1' }],          // outdent/indent
      [{ 'direction': 'rtl' }],                         // text direction

      [{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown
      [{ 'header': [1, 2, 3, 4, 5, 6, false] }],

      [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
      [{ 'font': [] }],
      [{ 'align': [] }],

      ['clean']                                         // remove formatting button
    ]
  };

  const [ title, setTitle ] = useState("");
  //let content = ""; // 렌더링 시 값 초기화 -> 상태로 바꿔줌 
   const [ content, setContent ] = useState("");

  const handleTitleChange = useCallback((e) => {
    setTitle(() => e.target.value);
  }, []); // useCallback -> 함수는 한번만 정의하면 됨.

  const handleQuillChange = useCallback((value) /** e아님! value 씀 */ => {
    content = value;
  }, []);
  console.log(content); // console창에 content에 값이 저장된걸 출력 


  return (
   <>
    <input type="text" onChange={handleTitleChange} />
    <ReactQuill modules={modules} onChange={handleQuillChange} />
   </>
  );
}

export default App;
