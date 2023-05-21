import React from "react";
import { useEffect } from "react";
import "./Post.scss";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import axios from "axios";
import moment from "moment";

const Post = () => {
  const { id } = useParams();
  const [postLiked, setPostLiked] = React.useState(false);
  const [currentDate, setCurrentDate] = React.useState('');
  const [currentPost, setCurrentPost] = React.useState({});
  const [comments, setComments] = React.useState([]);
  const [popularHashtags, setPopularHashtags] = React.useState([]);
  const [currentUsername, setCurrentUsername] = React.useState('');
  const [currentFullName, setCurrentFullName] = React.useState('');
  const [currentEmail, setCurrentEmail] = React.useState('');
  const [postWriter, setPostWriter] = React.useState(false);
  const [content, setContent] = React.useState('');
  const [comment, setComment] = React.useState('');
  const [commentWriter, setCommentWriter] = React.useState(false);
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

  const getPost = async () => {
    const postId = id;

    try {
      const response = await axios.post('/api/posts/get_single', { postId })

      if (response.data.success) {
        const post = response.data.post
        setCurrentPost(post);
      }
    } catch(error) {
        console.log(error)
    }
  }

  const processDate = async () => {
    let date = currentPost.date
    date = moment(date).format('h:mm a - MMMM Do YYYY')
    setCurrentDate(date)
  }

  const checkIfLiked = async () => {
    const postId = id;
    const email = sessionStorage.getItem("email")
    console.log(postId, "POST ID AND EMAIL")
    console.log(email, "EMAIL")

    try {
      const response = await axios.post('/api/posts/check_if_liked', { postId, email })

      if (response.data.success) {
        const liked = response.data.likeStatus
        console.log(liked, "LIKED STATUS")
        setPostLiked(liked);
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
        const comments = response.data.comments;
        setComments(comments);
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
        const likeStatus = response.data.likeStatus;
        console.log(likeStatus, "LIKE STATUS")
        setPostLiked(likeStatus);
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

  const handleCommentChange = (e) => {
    setComment(e.target.value);
  }

  const handleCommentSubmit = async () => {
    const author = [currentFullName, currentUsername]
    const postId = id;
    const response = await axios.post('/api/comments/add', { comment, author, currentEmail, postId })

    if (response.data.success) {
      setComment('');
      getAllComments();
      setCommentWriter(false);
    }
  };

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
        getPopularHashtags();
        setContent("");
        getPost();
        updateHashtags();

      }

    } catch (error) {
      console.log(error);
    }
  };

  const updateHashtags = async () => {
    try {
      const response = await axios.get('/api/hashtags/update_hashtags')

      if (response.data.success) {
        console.log(response.data);
      }
    } catch (error) {
      console.log(error);
    }
  }

  const handleCommentWriter = () => {
    setCommentWriter(!commentWriter);
    console.log(commentWriter, "COMMENT WRITER STATUS")
  };

  const hashtagFilter = async (e) => {
    const hashtag = e.hashtag;
    navigate(`/${hashtag}`);
  };

  const handlePostWriter = () => {
    setPostWriter(!postWriter);
  }

  const handleContentChange = (e) => {
    setContent(e.target.value);
  }

  useEffect(() => {
    checkLogin();
    getPost();
    getAllComments();
    getPopularHashtags();
    processDate();
    checkIfLiked();
  }, []);



  return ( 
    <div className="viewedPost">
      <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@48,400,0,0" />
      <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@48,400,1,0" />
      
      <div className="postLeftSideContainer">

        <div className="header">
          <h1 onClick={() => navigate('/home')}>Home</h1>
        </div>

        <button
          onClick = {handlePostWriter}
          className="tweetButton"
        >
          Tweet
        </button>

        <div className="userInfo">
          <p className="fullName">{currentFullName}</p> 
          <p className="username">@{currentUsername}</p>
        </div>

        </div>

     <div className="postMainContainer">
        <div className="post">
          <div className="arrowIcon">
            <FaArrowLeft onClick={() => navigate('/home')} />
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
              { ( postLiked ) 
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
                )}

                <span
                  className="material-symbols-outlined"
                  onClick = {handleCommentWriter}
                > 
                  mode_comment
                </span>
          </div>


            <div className="comments">
              {comments.map((comment,  index) => {
                return (
                  <div className="comment">
                    <div className="commentHeader">
                      <p className="fullName">{comment.author[0]}</p>
                      <p className="username">@{comment.author[1]}</p>
                    </div>
                    <div className="commentContents">
                      <p>{comment.comment}</p>
                    </div>
                  </div>
                )}
              )}

            </div>

        </div>
      </div>

     <div className="postRightSideContainer">
          <h1>Popular hashtags</h1>
          <div className="hashtags">
            {popularHashtags.map((hashtag,  index) => {
              return (
                <div className="hashtag"
                  onClick = { () => hashtagFilter(hashtag.hashtag) }
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
              <button
                onClick = {handleSubmit}
                className="submitButton"
              >Submit</button>
            </div>
      </div> )
      : null 
      }

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
              Sub
            </button>
          </div>
        )
        : null 
      }

    </div>

   );
};

export default Post;