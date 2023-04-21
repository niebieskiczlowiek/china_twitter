import React from "react";
import { useEffect } from "react";
import "./Home.scss";
import { useNavigate } from "react-router-dom";

import axios from "axios";

const Home = () => {
  const [postWriter, setPostWriter] = React.useState(false);
  const [content, setContent] = React.useState('');
  const [posts, setPosts] = React.useState([]);
  const [popularHashtags, setPopularHashtags] = React.useState([]);
  const [currentUsername, setCurrentUsername] = React.useState('');
  const [currentFullName, setCurrentFullName] = React.useState('');
  const [currentEmail, setCurrentEmail] = React.useState('');
  const navigate = useNavigate();

  function checkLogin() {
    const isLoggedIn = sessionStorage.getItem("token")
    if (isLoggedIn) {
      navigate('/home');
      const username = sessionStorage.getItem("username")
      const fullName = sessionStorage.getItem("fullName")
      const email = sessionStorage.getItem("email")
      console.log(username, fullName)
      setCurrentUsername(username)
      setCurrentFullName(fullName)
      setCurrentEmail(email)

    } else {
      navigate('/');
    }
  }

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

  const handleSubmit = async () => {
    const hashtags = content.match(/(?<=#)\w+/g);

    const payload = {
      currentFullName, currentUsername ,content, hashtags
    }

    try {
      const response = await axios.post("/api/posts/add", payload)
      const response2 = await axios.post("/api/hashtags/post", hashtags )

      if (response.data.success && response2.data.success) {
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

  const handleLike = async (postId) => {
    const payload = {
      postId,
      currentEmail
    }

    try {
      const response = await axios.post('/api/posts/update_likes', payload)
      if (response.data.success) {
        getPosts();
      }
    } catch (error) {
      console.log(error);
    }
  }

  const hashtagFilter = async (e) => {
    console.log(e.target.innerText);
  };

  const handlePostWriter = () => {
    setPostWriter(!postWriter);
  }

  const handleContentChange = (e) => {
    setContent(e.target.value);
  }


  useEffect(() => {
    checkLogin();
    getPosts();
    getPopularHashtags();
  }, []);



  return ( 
    <div className="home">
       {postWriter
        ?  ( <div className="postWriter">
            <form className="form">
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
        <h1>{currentFullName}</h1>
        <p>{currentUsername}</p>
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
                  <div className="userHeader">
                    <p className="fullName">{post.fullName}</p>
                    <p className="username">@{post.username}</p>
                  </div>
                  <div className="contents">
                    <p>
                      {post.content}
                    </p>
                  </div>
                  <div className="bottomBar">
                  
                  { ( post.likedBy.includes(currentEmail) ) 
                    ? (<button
                        className="likeButton-liked"
                        onClick = {() => handleLike(post._id)}
                      >
                        Like
                      </button> )
                    : ( <button
                        className="likeButton-unliked"
                        onClick = {() => handleLike(post._id)}
                      >
                        Like
                      </button> )}

                  </div>
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