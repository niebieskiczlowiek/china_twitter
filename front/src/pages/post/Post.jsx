import React from "react";
import { useEffect } from "react";
import "./Post.scss";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import axios from "axios";
import moment from "moment";

const Home = () => {
  const { id } = useParams();
  const [currentDate, setCurrentDate] = React.useState('');
  const [currentPost, setCurrentPost] = React.useState({});
  const [comments, setComments] = React.useState([]);
  const [popularHashtags, setPopularHashtags] = React.useState([]);
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
      setCurrentUsername(username)
      setCurrentFullName(fullName)
      setCurrentEmail(email)

    } else {
      navigate('/');
    }
  }

  const getPost = async() => {
    const postId = id;

    try {
      const response = await axios.post('/api/posts/get_single', { postId })

      if (response.data.success) {
        const post = response.data.post
        setCurrentPost(post);
        console.log(currentPost, "current post2")
        console.log(typeof post, "post")

        let date = post.date
        date = moment(date).format('h:mm a - MMMM Do YYYY')
        setCurrentDate(date)
      }
    } catch(error) {
        console.log(error)
    }
  }

  const getAllComments = async () => {
    const postId = id;
    try {
      const response = await axios.post('/api/comments/get', { postId });

      if (response.data.success) {
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
        getPost();
      }
    } catch (error) {
      console.log(error);
    }
  }

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

  useEffect(() => {
    getAllComments();
    getPopularHashtags();
    checkLogin();
    getPost();
    // console.log(currentPost.likedBy.includes(currentEmail), "liked by")
    console.log(currentPost, "current post")
  }, []);



  return ( 
    <div className="home">
      <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@48,400,0,0" />
      <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@48,400,1,0" />
      <div className="leftSideContainer">
        <h1>Home</h1>
        <button
          className = "tweetButton"
        >
          Create Post
        </button>

        <div className="userInfo">
          <h1>{currentFullName}</h1> 
          <p>@{currentUsername}</p>
        </div>

      </div>

     <div className="mainContainer">
        <div className="post">
          <div className="upperHeader">

          </div>
          <div className="postHeader">
            <p>{currentPost.fullName}</p>
            <a>@{currentPost.username}</a>
          </div>

          <div className="contents">
            <p className="content">{currentPost.content}</p>
            <p className="date">{currentDate}</p>
          </div>

          <div className="bottomBar">
              {/* { ( currentPost.likedBy.includes(currentEmail) ) 
                ? (
                    <div className="heartContainer">
                      <span
                        className="material-symbols-outlined"
                        // liked
                        onClick = { () => handleLike(currentPost._id) }
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
                      onClick = { () => handleLike(currentPost._id) }
                    >
                      favorite
                    </span>
                  </div>
                )} */}
          </div>


            <div className="comments">
              {comments.map((comment,  index) => {
                return (
                  <div className="comment">
                    <div className="commentHeader">
                      <p className="fullName">{comment.author[0]}</p>
                      <p className="username">@{comment.author[1]}</p>
                    </div>


                    <p>{comment.comment}</p>
                  </div>
                )}
              )}

            </div>

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