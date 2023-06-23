import Axios from "axios";
import React, { useState } from "react";
import "./Login.scss";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  async function loginUser(e) {
    e.preventDefault();

    const user = {
      email,
      password,
    };

    try {
      await Axios.post("http://localhost:5000/auth/login", user);
      setEmail("");
      setPassword("");
      setMessage("");
    } catch (error) {
      setMessage(error?.response?.errorMessage);
    }
  }

  return (
    <div className="login-container">
      <h3>Login to your account</h3>
      <form onSubmit={loginUser} className="form">
        <div className="form-item">
          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="form-item">
          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="actions">
          <button className="btn btn-default" onClick={loginUser}>
            Login
          </button>
        </div>
      </form>
      <div className="error">{message}</div>
    </div>
  );
}

export default Login;
