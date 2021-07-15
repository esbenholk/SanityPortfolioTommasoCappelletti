import React, { useEffect, useState, useContext } from "react";
import { NavLink } from "react-router-dom";

import AppContext from "../globalState";

export default function Footer() {
  const myContext = useContext(AppContext);
  const info = myContext.siteSettings;
  const tags = myContext.tags;
  const categories = myContext.categories;

  return (
    <footer>
      <div className="flex-row to-column">
        <div className="flex-column footer_link_column">
          <NavLink to="/">
            {info.logo && (
              <img className="logo" src={info.logo.asset.url} alt="" />
            )}
          </NavLink>
        </div>

        <div className="flex-column footer_link_column">
          <p>This is us</p>
          <NavLink to="/projects">Projects</NavLink>
          <NavLink to="/about">About us</NavLink>
          <NavLink to="/onsale">On Sale</NavLink>
        </div>

        <div className="flex-column footer_link_column">
          <p>Things that we like</p>
          {tags &&
            tags.map((tag, index) => (
              <p className="tag_button" key={index} id={"tag_" + tag + ""}>
                {" "}
                {tag}{" "}
              </p>
            ))}
        </div>
        <div className="flex-column footer_link_column">
          <p>Things that we do</p>
          {categories &&
            categories.map((category, index) => (
              <a
                href={category}
                className="tag_button"
                key={index}
                id={"category_" + category + index}
              >
                {" "}
                {category}{" "}
              </a>
            ))}
        </div>
      </div>

      <div className="flex-row">
        {info.socialMediaHandles &&
          info.socialMediaHandles.map((handle, index) => (
            <a
              href={handle.url}
              className="tag_button"
              key={index}
              id={"category_" + handle.url + ""}
            >
              <img
                className="social_media_icon"
                src={handle.logo.asset.url}
                alt=""
              />
            </a>
          ))}
      </div>
    </footer>
  );
}
