import React, { useState } from "react";
import "./LoginPopup.css";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { auth, fireDB } from "../../firebase/Firebase";
import { addDoc, collection, Timestamp } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

const LoginPopup = ({ setShowlogin }) => {
  const [currState, setCurrState] = useState("Login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [errorMessage, setErrorMessage] = useState(""); // State to hold error message
  const navigate = useNavigate();

  const signup = async (e) => {
    e.preventDefault();

    try {
      const users = await createUserWithEmailAndPassword(auth, email, password);
      console.log(users);
      const user = {
        name: name,
        email: email,
        uid: users.user.uid,
        time: Timestamp.now(),
      };
      const userRef = collection(fireDB, "users");
      await addDoc(userRef, user);

      // Clear form fields
      setName("");
      setEmail("");
      setPassword("");

      // Alert and switch to login view
      alert("Account created successfully. Please log in.");
      setCurrState("Login"); // Switch to Login view
    } catch (error) {
      setErrorMessage(error.message); // Set the error message if signup fails
    }
  };

  const login = async (e) => {
    e.preventDefault(); // Prevent form submission

    try {
      const result = await signInWithEmailAndPassword(auth, email, password);
      alert("Login Successful");

      // Save the user to local storage
      localStorage.setItem("user", JSON.stringify(result.user));

      // Hide the login popup
      setShowlogin(false);

      // Navigate to the home page
      navigate("/");
    } catch (error) {
      setErrorMessage("Invalid login credentials. Please try again."); // Set error message on failed login
    }
  };

  return (
    <div className="login-popup">
      {errorMessage && (
        <div className="error-popup">
          <p>{errorMessage}</p>
          <button onClick={() => setErrorMessage("")}>Close</button>
        </div>
      )}
      <form className="login-popup-container">
        <div className="login-popup-title">
          <h2>{currState}</h2>
        </div>
        <div className="login-popup-input">
          {currState === "Login" ? (
            <></>
          ) : (
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Your name"
              required
            />
          )}

          <input
            type="email"
            placeholder="Your email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Your password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="login-popup-condition">
          <input type="checkbox" required />
          <p>By checking, I agree to the terms of use & Privacy policy</p>
        </div>
        <button onClick={currState === "Login" ? login : signup}>
          {currState === "Sign Up" ? "Create account" : "Login"}
        </button>

        {currState === "Login" ? (
          <p>
            Create a new account?{" "}
            <span onClick={() => setCurrState("Sign Up")}>Click here!</span>{" "}
          </p>
        ) : (
          <p>
            Already have an account?{" "}
            <span onClick={() => setCurrState("Login")}>Login</span>{" "}
          </p>
        )}
      </form>
    </div>
  );
};

export default LoginPopup;