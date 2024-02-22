import React, { useState } from "react";
import "./SignIn.css";
import { Link, useNavigate } from "react-router-dom";

const SignIn = () => {
  const navigate = useNavigate();

  const [FullName, setFullName] = useState("");
  const [UserName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [ConfirmPassword, setConfirmPassword] = useState("");
  const [passwordMatch, setPasswordMatch] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [RegisterMessage, setRegisterMessage] = useState("");

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const storeUserData = (userData) => {
    localStorage.setItem("userData", JSON.stringify(userData));
  };

  const submitForm = async () => {
    try {
      if (password === ConfirmPassword) {
        const response = await fetch("http://localhost:5000/user/register", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            FullName,
            UserName,
            email,
            password,
            ConfirmPassword,
          }),
        });
        if (response.ok) {
          const data = await response.json();
          setRegisterMessage("Registered successfully");
          storeUserData(data);
          navigate("/login");
          console.log(data);
        } else {
          const errorResponseData = await response.json();
          console.log(errorResponseData);
          setRegisterMessage("Registration failed. Email already exist.");
        }
      } else {
        setPasswordMatch(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="SignInbody">
      <br /> <br />
      <section className="register">
        {RegisterMessage && (
          <div
            className={
              RegisterMessage === "Registered successfully"
                ? "success-message"
                : "error-message"
            }
          >
            {RegisterMessage}
          </div>
        )}
        <h1>Register</h1>
        <div id="registerform">
          <div>
            <input
              type="text"
              name="FullName"
              id="FullName"
              placeholder="Full Name: Damian King Stanley"
              required
              onChange={(e) => setFullName(e.target.value)}
            />
            <br /> <br />
            <input
              type="text"
              name="Username"
              id="Username"
              placeholder="Username: ZaddyKing"
              required
              onChange={(e) => setUserName(e.target.value)}
            />
            <br /> <br />
            <input
              type="email"
              name="email"
              id="emailAddress"
              placeholder="Email: damianstanley76@gmail.com"
              required
              onChange={(e) => setEmail(e.target.value)}
            />
            <br /> <br />
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              id="password"
              placeholder="Password"
              required
              onChange={handlePasswordChange}
            />
            <i
              className={`fas ${
                showPassword ? "fa-eye-slash" : "fa-eye"
              } password-toggle`}
              onClick={toggleConfirmPasswordVisibility}
            ></i>
            <br /> <br />
            <input
              type={showConfirmPassword ? "text" : "password"}
              name="confirmPassword"
              id="password"
              placeholder="Confirm Password"
              required
              onChange={handleConfirmPasswordChange}
            />
            <i
              className={`fas ${
                showPassword ? "fa-eye-slash" : "fa-eye"
              } password-toggle`}
              onClick={toggleConfirmPasswordVisibility}
            ></i>
            <div id="passwordmatchAlert">
              {!passwordMatch && (
                <p>Passwords do not match. Please try again.</p>
              )}
            </div>
            <br /> <br />
            <button onClick={submitForm} id="submitbtn">
              Register
            </button>
            <br />
            <br />
          </div>
          <br />
          <p>
            Already have an account? <Link to="/logIn">Log in</Link>
          </p>
        </div>
      </section>
    </div>
  );
};

export default SignIn;
