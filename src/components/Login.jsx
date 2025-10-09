import React, { useState } from "react";
import axios from "axios";
import "./Login.css";

function Login({ setLoggedIn }) {
  const [isRegistering, setIsRegistering] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [email, setEmail] = useState("");

  const handleLogin = async () => {
    try {
      const res = await axios.post("http://localhost:8080/users/login", {
        username,
        password,
      });
      if (res.data === "Login Successful") {
        setLoggedIn(true);
      } else {
        alert("Invalid username or password");
      }
    } catch (err) {
      alert("Login failed");
    }
  };

  const handleRegister = async () => {
    if (!username || !email || !password || !confirmPassword) {
      alert("Please fill all fields");
      return;
    }
    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    try {
      const res = await axios.post("http://localhost:8080/users/register", {
        username,
        email,
        password,
      });
      if (res.data === "Registration Successful") {
        alert("Registration successful! Please login.");
        setIsRegistering(false);
        setUsername("");
        setEmail("");
        setPassword("");
        setConfirmPassword("");
      } else {
        alert("Registration failed: " + res.data);
      }
    } catch (err) {
      alert("Registration failed");
    }
  };

  return (
    <div className="login-page">
      <h1 className="app-title">Property Management System</h1>

      <div className="login-wrapper">
        <div className="login-container">
          {isRegistering ? (
            <>
              <h2>Register</h2>
              <input
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <input
                type="password"
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
              <button onClick={handleRegister}>Register</button>
              <p className="toggle-text">
                Already have an account?{" "}
                <span
                  onClick={() => setIsRegistering(false)}
                  className="toggle-link"
                >
                  Login here
                </span>
              </p>
            </>
          ) : (
            <>
              <h2>Login</h2>
              <input
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button onClick={handleLogin}>Login</button>
              <p className="toggle-text">
                Don’t have an account?{" "}
                <span
                  onClick={() => setIsRegistering(true)}
                  className="toggle-link"
                >
                  Register here
                </span>
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default Login;
