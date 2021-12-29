import React, { useContext } from "react";
import { NavLink } from "react-router-dom";

import AppContext from "../globalState";

export default function Header() {
  const myContext = useContext(AppContext);
  const info = myContext.siteSettings;

  return (
    <>
      <div className="flex-row menu no-wrap">
        <NavLink to="/" className="logo">
          {info.logo && (
            <img src={info.logo.asset.url} alt="" className="logo" />
          )}
        </NavLink>
        <NavLink to="/about">
          <h2 className="header-object">About</h2>
        </NavLink>
        <NavLink to="/projects">
          <h2 className="header-object">Projects</h2>
        </NavLink>
      </div>
    </>
  );
}
