import { Link } from "react-router-dom";
import "./Header.scss"

function Header() {
  return (
    <div className="header">
      <h1 className="heading">
        <Link to="/home">Snippets Manager</Link>
      </h1>
      <div className="links">
        <Link className="login-link" to="/register">
          <strong>Register</strong>
        </Link>
        <Link className="login-link" to="/login">
          <strong>Login</strong>
        </Link>
      </div>
    </div>
  );
}
export default Header;
