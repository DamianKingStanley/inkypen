import React, { useState } from "react";
import Navbar from "../../component/Navbar/Navbar";
import Navibar from "../../component/Navibar/Navibar";
import "./UpdateProfile.css";

const UpdateProfile = () => {
  const [fullname, setFullname] = useState("");
  const [username, setUsername] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [location, setLocation] = useState("");
  const [socialMedia, setSocialMedia] = useState("");

  const handleUpdateProfile = async (e) => {
    e.preventDefault();

    try {
      const updatedProfile = {
        fullname,
        username,
        phoneNumber,
        location,
        socialMedia,
      };

      const response = await fetch("/user/profile/update", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedProfile),
      });

      if (response.ok) {
        const data = await response.json();
        console.log(data); // Handle the response as needed

        // Redirect the user to the dashboard or any other desired page
        // Example: history.push("/dashboard");
      } else {
        console.error("Error:", response.statusText);
        // Handle the error as needed
      }
    } catch (error) {
      console.error(error);
      // Handle the error as needed
    }
  };

  return (
    <div className="UpdateProfileBody">
      <Navbar />
      <Navibar />
      <div className="UpdateProfileForm">
        <h2>Update Profile</h2>
        <form onSubmit={handleUpdateProfile}>
          <input
            type="text"
            placeholder="Full Name"
            value={fullname}
            onChange={(e) => setFullname(e.target.value)}
          />
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="text"
            placeholder="Phone Number"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
          />
          <input
            type="text"
            placeholder="Location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
          <input
            type="text"
            placeholder="Social Media"
            value={socialMedia}
            onChange={(e) => setSocialMedia(e.target.value)}
          />
          <button type="submit">Update Profile</button>
        </form>
      </div>
    </div>
  );
};

export default UpdateProfile;
