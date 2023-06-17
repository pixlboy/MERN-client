import { Link } from "react-router-dom";

function Header() {
  return (
    <div className="header">
      <div></div>
      <h1 className="heading">
        <Link to="/home">Snippets Manager</Link>
      </h1>
      <Link className="login" to="/login">Login</Link>
    </div>
  );
}
export default Header;
