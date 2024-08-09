import { useState } from "react";
import "./Navbar.css";
import { Link, NavLink } from "react-router-dom";
import Logo from "../assets/TinyHabitsLogo.png";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav>
      <Link to="/" className="logo">
        <img src={Logo} alt="Logo" />
      </Link>
      <div
        className="menu"
        onClick={() => {
          setMenuOpen(!menuOpen);
        }}
      >
        <span></span>
        <span></span>
        <span></span>
      </div>
      <ul className={menuOpen ? "open" : ""}>
        <li>
          <NavLink to="/" className="home">
            Home
          </NavLink>
        </li>
        <li>
          <NavLink to="/new-habit">Add New Habit</NavLink>{" "}
        </li>
        <li>
          {" "}
          <NavLink to="/habits">Habits List</NavLink>{" "}
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
