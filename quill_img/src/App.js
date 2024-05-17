
import ReactQuill from 'react-quill';
import { useRef } from 'react';
import { getDownloadURL, ref, uploadBytes, uploadBytesResumable } from 'firebase/storage';
import { v4 as uuid } from "uuid";
import { storage } from './apis/firebase/config/firebaseConfig';

function App() {
  const reactQuillRef = useRef();

  const quilImageHandler = () => {
    const input = document.createElement("input");
    input.setAttribute("type", "file");
    input.setAttribute("accept", "image/*");
    input.click();

    input.onchange = async () => {
      const file = input.files[0];

      const storageRef = ref(storage, `quill_image/${uuid()}_${file.name}`) 
      const uploadResponse = await uploadBytes(storageRef, file);
      const downloadURL = await getDownloadURL(uploadResponse.ref);

      const editor = reactQuillRef.current.getEditor();
      const range = editor.getSelection(true);
      editor.insertEmbed(range.index, "image", downloadURL);
      editor.setSelection(range.index + 1);
    }
  }

  const modules = {
    toolbar: {
      container : [
        ["image"]
      ],
      handlers: {
        image: quilImageHandler
      }
    }
  };

  return (
    <div>
      <ReactQuill 
        modules={modules}
        ref={reactQuillRef}
        onChange={(value) => {
          console.log(value);
        }}
      />
    </div>
  );
}

export default App;
