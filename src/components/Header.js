import React, { useContext } from "react";
import { NavLink } from "react-router-dom";

import AppContext from "../globalState";

export default function Header() {
  const myContext = useContext(AppContext);
  const info = myContext.siteSettings;
  return (
    <nav>
      <NavLink className="standard-button" to="/projects">
        Projects
      </NavLink>
      <NavLink to="/">
        <div className="logo_container">
          {info.title && <p className="standard-button">{info.title}</p>}
          {info.logo && (
            <img className="logo" src={info.logo.asset.url} alt="" />
          )}
        </div>
      </NavLink>
      <NavLink className="standard-button" to="/about">
        About us
      </NavLink>
    </nav>
  );
}
