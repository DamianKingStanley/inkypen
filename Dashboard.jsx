import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../../component/Navbar/Navbar";
import Navibar from "../../component/Navibar/Navibar";
import "./Dashboard.css";
import posticon from "../../assest/iconpost.png";
import IndividualPost from "../../component/IndividualPost/IndividualPost";

const Dashboard = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const getUserProfile = async () => {
      try {
        const getUserToken = () => {
          const userData = JSON.parse(sessionStorage.getItem("userData"));
          return userData ? userData.token : "";
        };

        const userId = JSON.parse(sessionStorage.getItem("userData")).id;

        const response = await fetch(
          `http://localhost:5000/user/profile/${userId}`,
          {
            headers: {
              Authorization: `Bearer ${getUserToken()}`,
            },
          }
        );

        const data = await response.json();

        if (response.ok) {
          setUser(data);
        } else {
          console.error("Failed to retrieve user profile");
        }
      } catch (error) {
        console.error(error);
      }
    };

    getUserProfile();
  }, []);

  return (
    <div className="DashboardBody">
      <Navbar />
      <Navibar />
      {user ? (
        <div className="UserHeader">
          <h2>Welcome back, {user?.fullname}!</h2>
          <p>Username: {user?.result?.username}</p>
          <div className="updateAndPostBtn">
            <div className="updateOnly">
              <Link to={`/profile/edit/${user?.result?.username}`}>
                <button id="profileUpdateBtn">Update Profile</button>
              </Link>
            </div>
            <div id="postContentBtn">
              <Link to="/post-content">
                <p>
                  <img id="posticon" src={posticon} alt="" />
                  Share a post
                </p>
              </Link>
            </div>
          </div>
        </div>
      ) : (
        <p>Loading....</p>
      )}
      <IndividualPost />
    </div>
  );
};

export default Dashboard;
