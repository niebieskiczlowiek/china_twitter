import React from "react";
import { useEffect } from "react";
import "./Home.scss";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Home = () => {
  const [postWriter, setPostWriter] = React.useState(false);
  const [title, setTitle] = React.useState('');
  const [content, setContent] = React.useState('');
  const [posts, setPosts] = React.useState([])

  const getPosts = async () => {
    try {
      const response = await axios.get('/api/posts/get');

      if (response.data.success) {
        console.log(response.data);
        setPosts(response.data.posts)
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getPosts();
  }, []);

  const handleSubmit = async () => {
    const hashtags = content.match(/#[a-zA-Z0-9]+/g);

    const payload = {
      title, content, hashtags
    }

    try {
      const response = await axios.post("/api/posts/add", payload)

      if (response.data.success) {
        console.log(response.data);
        setTitle("");
        setContent("");
        getPosts();
      }
    } catch (error) {
      console.log(error);
    }
  };


  const handlePostWriter = () => {
    setPostWriter(!postWriter);
  }

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  }

  const handleContentChange = (e) => {
    setContent(e.target.value);
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
            <form className="form">
              <input 
                type="text" 
                placeholder="Title" 
                value = {title}
                onChange = {handleTitleChange}
              />

              <textarea
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


        <div className="posts">
          {posts.map((post, index) => {
            return (
              <div className="post" key={post._id}>
                <h1>{post.title}</h1>
                <p>
                  {post.content}
                </p>
                <a>{post.hashtag}</a>
              </div>
            )
          })}
        </div>

    </div>

   );
};

export default Home;