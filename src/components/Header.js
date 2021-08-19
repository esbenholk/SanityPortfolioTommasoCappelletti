import React, { useContext } from "react";
import { NavLink } from "react-router-dom";

import AppContext from "../globalState";

import useWindowDimensions from "./functions/useWindowDimensions";

import DropDownMenu from "./blocks/DropDownMenu";

export default function Header() {
  const myContext = useContext(AppContext);
  const info = myContext.siteSettings;
  const categories = myContext.categories;

  const { width } = useWindowDimensions();

  return (
    <>
      {width > 900 ? (
        <nav>
          <div className="flex-row menu no-wrap">
            <NavLink to="/">
              {info.logo && (
                <img className="logo" src={info.logo.asset.url} alt="" />
              )}
            </NavLink>
            <NavLink to="/about">
              <h2 className="header-object">About</h2>
            </NavLink>
            <NavLink to="/projects">
              <h2 className="header-object"> Projects</h2>
            </NavLink>
          </div>

          <div className="no-wrap rightMenu">
            <DropDownMenu categories={categories} />

            <NavLink to="/projects" className="basket">
              <img
                className="social_media_icon header-object"
                src="\assets\awesome-shopping-cart.png"
                alt="shopping cart"
                style={{ height: "36px", width: "40px" }}
              />
            </NavLink>
          </div>
        </nav>
      ) : (
        <>
          <nav>
            <div className="flex-row menu">
              <div className="flex-row">
                <NavLink to="/">
                  {info.logo && (
                    <img className="logo" src={info.logo.asset.url} alt="" />
                  )}
                </NavLink>
              </div>

              <div className="flex-row no-wrap  rightMenu">
                <NavLink to="/about">
                  <h2 className="header-object">About</h2>
                </NavLink>
                <NavLink to="/projects">
                  <h2 className="header-object"> Projects</h2>
                </NavLink>
                <NavLink to="/projects">
                  <img
                    className="social_media_icon header-object"
                    src="\assets\awesome-shopping-cart.png"
                    alt="shopping cart"
                    style={{ height: "36px", width: "40px !important" }}
                  />
                </NavLink>
              </div>
            </div>

            <DropDownMenu categories={categories} />
          </nav>
        </>
      )}
    </>
  );
}
