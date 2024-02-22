import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./CreatePost.css";
import Navbar from "../../component/Navbar/Navbar";
import Navibar from "../../component/Navibar/Navibar";

const CreatePost = ({}) => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [textAreaValue, setTextAreaValue] = useState("");
  const [selectedChoice, setSelectedChoice] = useState("");
  const navigate = useNavigate();
  const [errorResponse, setErrorResponse] = useState(null);
  const [postDetails, setPostDetails] = useState([]);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await fetch("http://localhost:5000/posts");
        const data = await response.json();
        setPostDetails(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchPost();
  }, []);

  const handleTextAreaChange = (event) => {
    setTextAreaValue(event.target.value);
  };

  const handleChoiceChange = (event) => {
    setSelectedChoice(event.target.value);
  };

  const submitForm = async () => {
    console.log("Title:", title);
    console.log("author:", author);
    console.log("Text Area Value:", textAreaValue);
    console.log("Selected Choice:", selectedChoice);
    if (selectedChoice === "Option 1") {
      navigate(`/stories/option1?textarea=${textAreaValue}`);
    } else if (selectedChoice === "Option 2") {
      navigate(`/poetries/option2?textarea=${textAreaValue}`);
    } else if (selectedChoice === "Option 3") {
      navigate(`/articles/option3?textarea=${textAreaValue}`);
    } else if (selectedChoice === "Option 4") {
      navigate(`/articles/option4?textarea=${textAreaValue}`);
    }

    try {
      const response = await fetch("http://localhost:5000/posts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          author,
          textAreaValue,
          selectedChoice,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        alert("sent succesfully");
        {
          postDetails.map((post) => {
            switch (selectedChoice.toLowerCase()) {
              case "story":
                navigate(`/stories/${post?._id}`);
                break;
              case "poetry":
                navigate(`/poetries/${post?._id}`);
                break;
              case "essay":
                navigate(`/articles/${post?._id}`);
                break;
              case "article":
                navigate(`/articles/${post?._id}`);
                break;
              default:
                console.error("Invalid option selected");
            }
          });
        }
        navigate("/");
      } else {
        const errorResponseData = await response.json();
        console.log(errorResponseData);
        setErrorResponse(errorResponseData.error);
      }
    } catch (error) {
      console.log(error);
    }
  };
  {
    return (
      <div className="CreatePostBody">
        <Navbar />
        <Navibar />
        <section className="Createpost">
          {errorResponse && <p className="post_response">{errorResponse}</p>}
          <h3>Choose a category</h3>
          <select
            id="categories"
            value={selectedChoice}
            onChange={handleChoiceChange}
          >
            <option value="">Select an option</option>
            <option value="Story">Story</option>
            <option value="Poetry">Poetry</option>
            <option value="Essay">Essay</option>
            <option value="NonFiction">Non-Fiction</option>
          </select>
          <br /> <br />
          <label htmlFor="Author"> Author: </label> <br />
          <input
            type="text"
            name="author"
            id="Creator"
            required
            onChange={(e) => setAuthor(e.target.value)}
          />{" "}
          <br /> <br />
          <label htmlFor="Title"> Title: </label> <br />
          <input
            type="text"
            name="title"
            id="Title"
            required
            onChange={(e) => setTitle(e.target.value)}
          />
          <br /> <br />
          <h3>Paste your content here:</h3>
          <textarea
            id="content"
            value={textAreaValue}
            onChange={handleTextAreaChange}
          />{" "}
          <br /> <br />
          <button id="createpostbtn" onClick={submitForm}>
            Create Post
          </button>
        </section>
      </div>
    );
  }
};

export default CreatePost;
