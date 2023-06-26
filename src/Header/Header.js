import { useContext } from "react";
import { Link } from "react-router-dom";
import "./Header.scss";
import UserContext from "../Shared/UserProvider";
import Axios from "axios";

function Header() {
  const { user, getUser } = useContext(UserContext);

  async function logout() {
    await Axios("http://localhost:5000/auth/logout");
    getUser();
  }

  return (
    <div className="header">
      <h1 className="heading">
        <Link to="/home">Snippets Manager</Link>
      </h1>
      {user === null ? (
        <div className="links">
          <Link className="login-link" to="/register">
            <strong>Register</strong>
          </Link>
          <Link className="login-link" to="/login">
            <strong>Login</strong>
          </Link>
        </div>
      ) : (
        user && (
          <div className="links">
            <Link className="login-link" to="/logout" onClick={logout}>
              <strong>Logout</strong>
            </Link>
          </div>
        )
      )}
    </div>
  );
}
export default Header;
