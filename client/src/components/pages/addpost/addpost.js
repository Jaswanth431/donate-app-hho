import React, {useRef} from 'react'
import MAIN from "../../utilities/main";
import './addpost.css';
import { Editor } from '@tinymce/tinymce-react';
import {addPostHandler} from '../../../api/index';
import { useNavigate } from "react-router-dom";
import PRIVATEROUTE from '../../utilities/privateroute';

const ADDPOST =  () => {


  const editorRef = useRef(null);
  const headingRef = useRef(null);
  const navigate = useNavigate();


    const getData = async (url, data)=>{
        await addPostHandler(data);
        navigate(`/posts/${url}`);  

    }

  const submitPost = () => {

    if (editorRef.current) {
      const heading = headingRef.current.value.trim();
      const postBody= editorRef.current.getContent().trim();

      if(!heading){
        headingRef.current.focus();
        return;
      }
      if(!postBody){
        editorRef.current.focus();
        return;
      }

      let url = heading.replace(/  +/g, ' ');
      url= url.split(' ').join('-');
      const randVal = Math.floor(Math.random() * 100000000);
      url = `${url}-${randVal}`.toLowerCase();
      getData(url,{heading, postBody,url } );

    }
  };

  return (
    <PRIVATEROUTE>
    <MAIN>
        <section className="row">
            <div className="addpost-box">
                    <input className="addpost-heading" ref={headingRef} placeholder='Enter the title of the post' />
                    <Editor placeholder="Enter your post body"
                apiKey='bg2yojopomvhotvyzcmph91pv5zjgvmzp90g0ke46cmi103b'
                onInit={(evt, editor) => editorRef.current = editor}
                initialValue="<p>Enter you post here.....</p>"
                init={{
                height: 500,
                menubar: false,
                plugins: [
                    'advlist', 'autolink', 'lists', 'link', 'image', 'charmap', 'preview',
                    'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
                    'insertdatetime', 'media', 'table', 'code', 'help', 'wordcount'
                ],
                toolbar: 'undo redo | blocks | ' +
                    'bold italic forecolor | alignleft aligncenter ' +
                    'alignright alignjustify | bullist numlist outdent indent | ' +
                    'removeformat | help',
                content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px, border:2px solid black }'
                }}
            />
            <div className='btn-addpost-box'>
              <button onClick={submitPost} className="btn-addpost">Add Post</button>
            </div>
                
        </div>
    </section>
</MAIN>
</PRIVATEROUTE>
  )
}

export default ADDPOST;
