import { useState } from "react";
import { NavLink, Link } from "react-router-dom";
import { config } from "../config";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  const linkClass = ({ isActive }) => "link" + (isActive ? " active" : "");

  return (
    <div className={"navbar" + (open ? " active" : "")}>
      <div className="menu-mobile">
        <Link to="/">
          <div className="logo">
            <img
              src={`/images/${config.serverInfo.serverLogoImageFileName}`}
              alt="Server logo"
              className="logo-img"
              width="40"
              height="40"
            />
            <h3 className="server-name">{config.serverInfo.serverName}</h3>
          </div>
        </Link>
        <div className="hamburger" onClick={() => setOpen((o) => !o)}>
          <i className="fa-solid fa-bars"></i>
        </div>
      </div>

      <div className="links">
        <NavLink to="/" end className={linkClass}>
          Home
        </NavLink>
        <NavLink to="/rules" className={linkClass}>
          Rules
        </NavLink>
        <NavLink to="/admin-team" className={linkClass}>
          Staff
        </NavLink>
      </div>
    </div>
  );
}
