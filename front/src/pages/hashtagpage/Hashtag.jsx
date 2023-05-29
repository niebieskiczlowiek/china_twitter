import React from "react";
import { useEffect } from "react";
import "./Hashtag.scss";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import axios from "axios";

const Hashtag = () => {
  const { tag } = useParams();

  // Post Writer
  const [postWriter, setPostWriter] = React.useState(false);
  const [content, setContent] = React.useState('');

  // Comment Writer
  const [commentWriter, setCommentWriter] = React.useState(false);
  const [comment, setComment] = React.useState('');
  const [replyingTo, setReplyingTo] = React.useState('');

  // Page contents
  const [posts, setPosts] = React.useState([]);
  const [currentPostId , setCurrentPostId] = React.useState('');
  const [popularHashtags, setPopularHashtags] = React.useState([]);

  // User Info
  const [currentUsername, setCurrentUsername] = React.useState('');
  const [currentFullName, setCurrentFullName] = React.useState('');
  const [currentEmail, setCurrentEmail] = React.useState('');

  const navigate = useNavigate();

  function checkLogin() {
    const isLoggedIn = sessionStorage.getItem("token")
    if (isLoggedIn) {
      const username = sessionStorage.getItem("username")
      const fullName = sessionStorage.getItem("fullName")
      const email = sessionStorage.getItem("email")
      console.log("CHECK LOGIN")
      setCurrentUsername(username)
      setCurrentFullName(fullName)
      setCurrentEmail(email)
    } else {
      navigate('/');
    }
  }

  const getPosts = async () => {
    console.log("GET POSTS")
    try {
      const response = await axios.post('/api/posts/get/hashtag', { tag });

      console.log(response.data.posts, "response data posts")

      if (response.data.success) {
        setPosts(response.data.posts)
      }
    } catch (error) {
      console.log(error);
    }
  };

  const updateHashtags = async () => {
    try {
      const response = await axios.get('/api/hashtags/update_hashtag')

      if (response.data.success) {
        console.log(response.data);
        setPosts(response.data.posts)
      }
    } catch (error) {
      console.log(error);
    }
  }

  const handleSubmit = async () => {
    let hashtags = content.match(/(?<=#)\w+/g);

    if (!hashtags) {
      hashtags = [];
    }

    const payload = {
      currentFullName, currentUsername ,content, hashtags
    }

    try {
      const response = await axios.post("/api/posts/add", payload)

      if (response.data.success) {
        getPosts();
        getPopularHashtags();
        setContent("");
        updateHashtags();
        setPostWriter(!postWriter);

      }

    } catch (error) {
      console.log(error);
    }
  };

  const handleCommentSubmit = async () => {
    const author = [currentFullName, currentUsername]
    const postId = currentPostId;
    const response = await axios.post('/api/comments/add', { comment, author, currentEmail, postId })

    if (response.data.success) {
      setComment('');
      getPosts();
      setCommentWriter(!commentWriter);
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
    console.log(postId, "like post id")
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

  const viewPost = (postId) => {
    console.log(postId, "view post id")

    navigate(`/post/${postId}`);
  }

  const hashtagFilter = async (e) => {
    const hashtag = e.hashtag;
    console.log(hashtag, "hashtag")
    navigate(`/${hashtag}`);
  };

  const handlePostWriter = () => {
    setPostWriter(!postWriter);
  }

  const handleCommentWriter = (postId, postAuthor) => {
    setReplyingTo(postAuthor);
    setCurrentPostId(postId);
    setCommentWriter(!commentWriter);
  }

  const handleContentChange = (e) => {
    setContent(e.target.value);
  }

  const handleCommentChange = (e) => {
    setComment(e.target.value);
  }

  const logOut = () => {
    sessionStorage.clear();
    navigate('/');
  }

  useEffect(() => {
    getPosts();
    checkLogin();
    getPopularHashtags();
  }, []);



  return ( 
    <div className="hashtag">
      <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@48,400,0,0" />
      <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@48,400,1,0" />
      <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@48,400,0,0" />

      <div className="leftSideContainer">
        <div className="header">
            <h1 onClick={() => navigate('/home')}>Home</h1>
          </div>

          <button
            onClick = {handlePostWriter}
            className="tweetButton"
          >
            Tweet
          </button>

          <button
            onClick = {logOut}
            className="logoutButton"
          >
            Log out
          </button>

          <div className="userInfo">
            <p className="fullName">{currentFullName}</p> 
            <p className="username">@{currentUsername}</p>
          </div>
      </div>

     <div className="mainContainer">
          <div className="tagHeader">
            <p className="arrowIcon"> 
              <FaArrowLeft 
                onClick = {() => navigate('/home')}
              /> 
            </p>
            <p className="tagName">#{tag}</p>
          </div>
          <div className="posts">
            {posts.map((post) => {
              return (
                <div className="post" key={post._id}>
                  <div className="userHeader">
                    <p className="fullName">{post.fullName}</p>
                    <p className="username">@{post.username}</p>
                  </div>

                  <div className="contents"
                    onClick = { () => viewPost(post._id) }
                  >
                    <p className="content">
                      {post.content}
                    </p>
                  </div>

                  <div className="bottomBar">
                  
                  { ( post.likedBy.includes(currentEmail) ) 
                    ? (
                        <div className="heartContainer">
                          <span
                            className="material-symbols-outlined"
                            // liked
                            onClick = {() => handleLike(post._id)}
                          >
                            favorite
                          </span>
                        </div>
                     )
                    : ( 
                      <div className="unlikedContainer">
                        <span
                          className="material-symbols-outlined"
                          // unliked
                          onClick = {() => handleLike(post._id)}
                        >
                          favorite
                        </span>
                      </div>
                     ) }


                      <span
                        className="material-symbols-outlined"
                        onClick={() => handleCommentWriter(post._id, post.username)}
                      > 
                        mode_comment
                      </span>

                      {commentWriter
                        ? (
                          <div className="commentWriter">
                            <form className="form">
                              <textarea
                                type="text"
                                placeholder="Comment"
                                value={comment}
                                onChange={handleCommentChange}
                              />

                            </form>
                            <button type="submit"
                              onClick={
                                () => {
                                  handleCommentSubmit()
                                }
                              }
                            >
                              Submit
                            </button>
                          </div>
                        )
                        : null 
                      }

                     
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
                  onClick = { () => hashtagFilter(hashtag) }
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

     {postWriter
      ?  ( <div className="postWriter">
            <div className="postWriterContainer">

              
              <form className="form">
                <div className="closeButton"
                  onClick = {() => setPostWriter(false)}
                >
                  <div class="material-symbols-outlined">
                    close
                  </div>
                </div>

                <textarea
                  type="text" 
                  placeholder="What's up?"
                  value = {content}
                  onChange = {handleContentChange}  
                />
              </form> 
            <div className="submitButtonContainer">
              <button
                  onClick = {handleSubmit}
                  className="submitButton"
                >Post tweet!</button>
            </div>
            </div>
      </div> )
      : null 
      }
    
      {commentWriter
        ? (
          <div className="commentWriter">
            <div className="commentWriterContainer">
              <form className="form">
                <div className="closeButton"
                  onClick = {() => setCommentWriter(false)}
                >
                  <div class="material-symbols-outlined">
                    close
                  </div>
                </div>

                <textarea
                  className="commentInput"
                  type="text"
                  placeholder={`Replying to @${replyingTo}`}
                  value={comment}
                  onChange={handleCommentChange}
                />
              </form>
             <div className="submitButtonContainer">
              <button
                  className="submitButton"
                  onClick={
                    () => {
                      handleCommentSubmit()
                    }
                  }
                >
                  Post reply
                </button>
             </div>
            </div>
          </div>
        )
        : null 
      }


    </div>

   );
};

export default Hashtag;