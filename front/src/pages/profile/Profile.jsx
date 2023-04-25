import React from "react";
import { useEffect } from "react";
import "./Profile.scss";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Profile = () => {
    const [content, setContent] = React.useState("");
    const [posts, setPosts] = React.useState([]);
    const [popularHashtags, setPopularHashtags] = React.useState([]);
    const [currentUsername, setCurrentUsername] = React.useState("");
    const [currentFullName, setCurrentFullName] = React.useState("");
    const navigate = useNavigate();
    
    function checkLogin() {
        const isLoggedIn = sessionStorage.getItem("token");
        if (isLoggedIn) {
        navigate("/home");
        const username = sessionStorage.getItem("username");
        const fullName = sessionStorage.getItem("fullName");
        console.log(username, fullName);
        setCurrentUsername(username);
        setCurrentFullName(fullName);
        } else {
        navigate("/");
        }
    }
    
    const getPosts = async () => {
        try {
        const response = await axios.get("/api/posts/get");
    
        if (response.data.success) {
            console.log(response.data);
            setPosts(response.data.posts);
        }
        } catch (error) {
        console.log(error);
        }
    };

    const handleSubmit = async () => {
        const hashtags = content.match(/(?<=#)\w+/g);

        const payload = {
        currentFullName,
        currentUsername,
        content,
        hashtags,
        };
    
        try {
        const response = await axios.post("/api/posts/add", payload);
        const response2 = await axios.post("/api/hashtags/post", hashtags);
    
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
        const response = await axios.get("/api/hashtags/popular");
        if (response.data.success) {
            setPopularHashtags(response.data.hashtags);
        }
        } catch (error) {
        console.log(error);
        }
    };
    
    useEffect(() => {
        // checkLogin();
        getPosts();
        getPopularHashtags();
    }, []);
    
    return (
        <div className="home">
        <div className="homeContainer">
            <div className="homeLeft">
            {posts.map((post) => (
                <div className="post">
                <div className="postTop">
                    <div className="postTopLeft">
                    <img
                        className="postProfileImg"
                        src="assets/person/1.jpeg"
                        alt=""
                    />
                    <span className="postUsername">{post.username}</span>
                    <span className="postDate">{post.date}</span>
                    </div>
                    <div className="postTopRight">
                    <i className="postTopRightIcon fas fa-ellipsis-h"></i>
                    </div>
                </div>
                <div className="postCenter">
                    <span className="postText">{post.content}</span>
                    <img className="postImg" src="assets/post/1.jpeg" alt="" />
                </div>
                </div>
            ))}
            </div>
            <div className="homeRight">
                {popularHashtags.map((hashtag) => (
                    <div className="homeRightTrend">
                    <span className="homeRightTrendName">#{hashtag.name}</span>
                    <span className="homeRightTrendCount">
                        {hashtag.count} posts
                    </span>
                    </div>
                ))}
                </div>
            </div>
            </div>
    );
};

export default Profile;