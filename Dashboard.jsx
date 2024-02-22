import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../../component/Navbar/Navbar";
import Navibar from "../../component/Navibar/Navibar";
import "./Dashboard.css";

const Dashboard = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const userData = sessionStorage.getItem("userData");

    if (userData) {
      const parsedData = JSON.parse(userData);
      setUser(parsedData);
    }
  }, []);

  const updateUserProfile = () => {
    // Handle the logic to update the user's profile
  };

  return (
    <div className="DashboardBody">
      <Navbar />
      <Navibar />
      {user ? (
        <div className="UserHeader">
          <h2>Welcome back, {user?.result?.fullname}!</h2>
          <p>Username: {user?.result?.username}</p>
          <Link to="/profile/edit">
            <button>Update Profile</button>
          </Link>
        </div>
      ) : (
        <p>Loading....</p>
      )}
    </div>
  );
};

export default Dashboard;
