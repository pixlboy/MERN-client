import Axios from "axios";
import React, { useState } from "react";
import "./Register.scss";

function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordVerify, setPasswordVerify] = useState("");
  const [message, setMessage] = useState("");

  async function registerUser(e) {
    e.preventDefault();

    const user = {
      email,
      password,
      passwordVerify,
    };

    try {
      await Axios.post("http://localhost:5000/auth/register", user);
      setMessage("Successfully Registered");
      setEmail("");
      setPassword("");
      setPasswordVerify("");
    } catch (error) {
      const { data } = error?.response;
      setMessage(data?.errorMessage);
    }
  }

  return (
    <div className="register-container">
      <h3>Register a new account</h3>
      <form onSubmit={registerUser} className="form">
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
        <div className="form-item">
          <label>Verify Password</label>
          <input
            type="password"
            value={passwordVerify}
            onChange={(e) => setPasswordVerify(e.target.value)}
          />
        </div>
        <div className="actions">
          <button className="btn btn-default" onClick={registerUser}>
            Register
          </button>
        </div>
      </form>
      <div className="error">{message}</div>
    </div>
  );
}

export default Register;
