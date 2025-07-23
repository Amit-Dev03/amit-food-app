import logo from "../../assets/logo.png";
import { useState } from "react";
import { Link } from "react-router-dom";
import Online from "../status/Online";
import Offline from '../status/Offline'
import useOnlineStatus from "../../utils/useOnlineStatus";
import { BUTTON_CLASSES } from "../../utils/constant";
const Navbar = () => {
  const [loginBtn, setLoginBtn] = useState("Login!");
  const onlineStatus = useOnlineStatus();

  return (
    <nav className="flex items-center justify-between border mb-6">
      <div className="logo-container flex  w-80 ml-28 p-1">
        <Link to="/">
          <img
            className="w-16 mt-4 rounded-2xl hover:shadow-md hover:scale-110 hover:transition delay-100 duration-300 ease-in-out"
            src={logo}
            alt="logo"
          />
        </Link>
        <Link to="/">
          <p className="style-script-regular text-6xl mt-7 ml-2 ">QuickBites</p>
        </Link>
      </div>
      <div className="mr-2">
        <ul className="flex list-none m-1 p-4 gap-5 font-medium items-center">
          <li className="flex pt-6">
            {onlineStatus === true ? <Online /> : <Offline />}
          </li>
          <li className="hover:font-semibold hover:text-blue-600 transition-all duration-200 hover:text-lg hover:-translate-y-1 hover:scale-110">
            <Link to="/">Home</Link>
          </li>
          <li className="hover:font-semibold hover:text-blue-600 transition-all duration-200 hover:text-lg hover:-translate-y-1 hover:scale-110">
            <Link to="/about">About Us</Link>
          </li>
          <li className="hover:font-semibold hover:text-blue-600 transition-all duration-200 hover:text-lg hover:-translate-y-1 hover:scale-110">
            <Link to="/cart">Cart</Link>
          </li>
          <li className="hover:font-semibold hover:text-blue-600 transition-all duration-200 hover:text-lg hover:-translate-y-1 hover:scale-110">
            <Link to="/contact">Contact Us</Link>
          </li>
          <li className="hover:font-semibold hover:text-blue-600 transition-all duration-200 hover:text-lg hover:-translate-y-1 hover:scale-110">
            <Link to="/grociery">Grociery</Link>
          </li>
          <button
            className={BUTTON_CLASSES + "hover:-translate-y-1 hover:scale-110"}
            onClick={() =>
              loginBtn === "Login!"
                ? setLoginBtn("LogOut!")
                : setLoginBtn("Login!")
            }
          >
            {loginBtn}
          </button>
        </ul>
      </div>
    </nav>
  );
};
export default Navbar;
