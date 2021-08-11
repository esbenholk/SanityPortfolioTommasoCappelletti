import React, { useContext } from "react";
import { NavLink } from "react-router-dom";

import AppContext from "../globalState";

import useWindowDimensions from "./functions/useWindowDimensions";

import SearchBar from "./blocks/SearchBar";

export default function Header() {
  const myContext = useContext(AppContext);
  const info = myContext.siteSettings;
  const categories = myContext.categories;

  const { width } = useWindowDimensions();

  console.log("header", myContext);

  return (
    <>
      {width > 700 ? (
        <nav>
          <div className="flex-row menu">
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

          <SearchBar categories={categories}></SearchBar>

          <div className="flex-row no-wrap rightMenu">
            {info.socialMediaHandles &&
              info.socialMediaHandles.map((handle, index) => (
                <a
                  href={handle.url}
                  className="tag_button"
                  key={index}
                  id={"category_" + handle.url + ""}
                >
                  <img
                    className="social_media_icon header-object"
                    src={handle.logo.asset.url}
                    alt=""
                    style={{ height: "31px" }}
                  />
                </a>
              ))}
            <NavLink to="/projects">
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
            <SearchBar categories={categories}></SearchBar>

            <div className="flex-row menu">
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
          </nav>
        </>
      )}
    </>
  );
}
