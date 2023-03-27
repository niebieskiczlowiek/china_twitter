import React from "react";
import "./Home.scss";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Home = () => {
  const [postWriter, setPostWriter] = React.useState(false);
  const [title, setTitle] = React.useState('');
  const [content, setContent] = React.useState('');

  
  const handlePostWriter = () => {
    setPostWriter(!postWriter);
  }

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  }

  const handleContentChange = (e) => {
    setContent(e.target.value);
  }

  const handleSubmit = async () => {
    const payload = {
      title, content
    }

    try {
      const response = await axios.post("/api/posts/add", payload)

      if (response.data.success) {
        console.log(response.data);
      }
    } catch (error) {
      console.log(error);
    }
  }


  return ( 
    <div className="home">
      <h1>Home</h1>
      <button
        onClick = {handlePostWriter}
      >
        Create Post
      </button>


      {postWriter
        ?  ( <div className="postWriter">
            <form>
              <input 
                type="text" 
                placeholder="Title" 
                value = {title}
                onChange = {handleTitleChange}
              />

              <input 
                type="text" 
                placeholder="Content"
                value = {content}
                onChange = {handleContentChange}  
              />
            </form>
            <button type="submit"
              onClick = {handleSubmit}
            >Submit</button>

          </div> )
          : null }

    </div>

   );
};

export default Home;