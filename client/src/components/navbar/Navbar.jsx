import logo from "../../assets/logo.png";
import { useState } from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";
const Navbar = () => {
  const [login, setLogin] = useState("Log in!");
  return (
    <nav className="navbar">
      <Link to="/">
        <img
          src={logo}
          alt="logo"
        />
      </Link>
      <h2>Amit's Restaurant</h2>
      <ul>
        <Link to="/">
          <li>Home</li>
        </Link>
        <Link to="/about">
          <li>About Us</li>
        </Link>
        <Link to="/contact">
          <li>Contact Us</li>
        </Link>
        <Link to="/cart">
          <li>Cart</li>
        </Link>

        <button
          className="login-btn"
          onClick={() =>
            login === "Log in!" ? setLogin("Log out!") : setLogin("Log in!")
          }
        >
          {login}
        </button>
      </ul>
    </nav>
  );
};
export default Navbar;
