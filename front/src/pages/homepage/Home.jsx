import React from "react";
import { useEffect } from "react";
import "./Home.scss";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Home = () => {
  const [postWriter, setPostWriter] = React.useState(false);
  const [title, setTitle] = React.useState('');
  const [content, setContent] = React.useState('');
  const [posts, setPosts] = React.useState([]);
  const [popularHashtags, setPopularHashtags] = React.useState([]);
  const [currentUser, setCurrentUser] = React.useState('');

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

  const getCurrentUser = async () => {
      const token = sessionStorage.getItem('token');

      setCurrentUser(token);
  };

  const handleSubmit = async () => {
    const hashtags = content.match(/(?<=#)\w+/g);

    const payload = {
      title, content, hashtags
    }

    try {
      const response = await axios.post("/api/posts/add", payload)
      const response2 = await axios.post("/api/hashtags/post", hashtags )

      if (response.data.success && response2.data.success) {
        setTitle("");
        setContent("");
        getPosts();
        getPopularHashtags();
      }

    } catch (error) {
      console.log(error);
    }
  };

  const getPopularHashtags = async () => {
    try {
      const response = await axios.get('/api/hashtags/get_popular')

      if (response.data.success) {
        const hashtags = response.data.hashtags;
        setPopularHashtags(hashtags)
      }
    } catch (error) {
      console.log(error);
    }
  };

  const hashtagFilter = async (e) => {
    console.log(e.target.innerText);
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

  useEffect(() => {
    getPosts();
    getPopularHashtags();
  }, []);


  return ( 
    <div className="home">
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

      <div className="leftSideContainer">
        <h1>debil</h1>
      </div>

     <div className="mainContainer">
      <h1>Home</h1>
        <button
          onClick = {handlePostWriter}
        >
          Create Post
        </button>

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
     <div className="rightSideContainer">
          <h1>Popular hashtags</h1>
          <div className="hashtags">
            {popularHashtags.map((hashtag,  index) => {
              return (
                <div className="hashtag"
                  onClick = { hashtagFilter }
                >
                  <p>
                    {hashtag.hashtag} ({hashtag.count}) 
                  </p>
                </div>
                )
              }
            )}
          </div>
     </div>

    </div>

   );
};

export default Home;