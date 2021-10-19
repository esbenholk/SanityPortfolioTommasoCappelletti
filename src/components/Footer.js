import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import BlockContent from "@sanity/block-content-to-react";
import useWindowDimensions from "./functions/useWindowDimensions";

import AppContext from "../globalState";

import ProductCard from "./blocks/productCard";

import { motion } from "framer-motion";

export default function Footer() {
  const myContext = useContext(AppContext);
  const info = myContext.siteSettings;
  const projectList = myContext.projectList;

  const { width } = useWindowDimensions();

  return (
    <div>
      <div className="regContainer">
        <motion.h1 className="flex-column fullWidthPadded">
          Others also viewed
        </motion.h1>

        {projectList ? (
          <div className="overscrollPadded horizontalScroll2">
            {projectList.map((post, index) => (
              <ProductCard post={post} key={index} />
            ))}
          </div>
        ) : null}
      </div>
      <footer>
        <div className="flex-row justifyBetween footer_top">
          <div className="flex-row ">
            <NavLink to="/">
              {info.logo && (
                <img
                  className="logo footerLogo"
                  src={info.footerlogo.asset.url}
                  alt=""
                />
              )}
            </NavLink>

            {width > 1200 ? (
              <div className="flex-row">
                <NavLink to="/about">
                  <h2 className="header-object footer-object">About</h2>
                </NavLink>
                <NavLink to="/projects">
                  <h2 className="header-object footer-object">Projects</h2>
                </NavLink>
                <NavLink to="/projects">
                  <h2 className="header-object footer-object">On Sale</h2>
                </NavLink>{" "}
              </div>
            ) : null}
          </div>

          {width > 1200 ? (
            <div className="flex-row">
              {info.socialMediaHandles &&
                info.socialMediaHandles.map((handle, index) => (
                  <a
                    href={handle.url}
                    key={index}
                    id={"category_" + handle.url + ""}
                  >
                    <img
                      className="footer_social_media_icon"
                      src={handle.logo.asset.url}
                      alt=""
                    />
                  </a>
                ))}
            </div>
          ) : null}
        </div>

        <div className="footer_bottom">
          {width > 1200 && info.contact ? (
            <div className="blockContent">
              <BlockContent
                blocks={info.contact}
                projectId="swdt1dj3"
                dataset="production"
              />
            </div>
          ) : (
            <div className="flex-row">
              {info.socialMediaHandles &&
                info.socialMediaHandles.map((handle, index) => (
                  <a
                    href={handle.url}
                    key={index}
                    id={"category_" + handle.url + ""}
                  >
                    <img
                      className="footer_social_media_icon"
                      src={handle.logo.asset.url}
                      alt=""
                    />
                  </a>
                ))}
            </div>
          )}
        </div>
      </footer>
    </div>
  );
}
