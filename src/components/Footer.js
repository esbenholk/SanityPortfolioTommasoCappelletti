import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import BlockContent from "./blocks/BlockContent";

import useWindowDimensions from "./functions/useWindowDimensions";

import AppContext from "../globalState";

import ProductCard from "./blocks/productCard";

import { motion } from "framer-motion";

export default function Footer() {
  const myContext = useContext(AppContext);
  const info = myContext.siteSettings;
  const projectList = myContext.projectList;

  const { width } = useWindowDimensions();

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
      /* you can also use 'auto' behaviour
         in place of 'smooth' */
    });
  };

  return (
    <div>
      <div className="regContainer">
        <motion.h2 className="flex-column fullWidthPadded">
          Others also viewed
        </motion.h2>

        {projectList ? (
          <div
            style={{ backgroundColor: "white" }}
            className="overscrollPadded horizontalScroll2"
          >
            {projectList.map((post, index) => (
              <ProductCard post={post} key={index} />
            ))}
          </div>
        ) : null}
      </div>

      {width < 600 ? (
        <div className="flex-row fullwidth align-right">
          <img
            style={{
              height: "55px",
              width: "55px",
              transform: "rotate(-90deg)",
            }}
            className="scrolltoTop"
            src={`../assets/arrow_in_circle.svg`}
            alt="prevArrow"
            onClick={scrollToTop}
          />
        </div>
      ) : null}

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
                <NavLink to="/on-sale">
                  <h2 className="header-object footer-object">On Sale</h2>
                </NavLink>{" "}
              </div>
            ) : null}
          </div>

          {width > 1200 ? (
            <div className="flex-row">
              {info.socialMediaHandles &&
                info.socialMediaHandles.slice(0, 4).map((handle, index) => (
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
              <BlockContent blocks={info.contact} />
            </div>
          ) : (
            <div className="flex-row">
              {info.socialMediaHandles &&
                info.socialMediaHandles.slice(0, 4).map((handle, index) => (
                  <a
                    href={handle.url}
                    key={"footer_social_media_icon" + index}
                    id={"category_" + handle.url + ""}
                  >
                    <img
                      className="footer_social_media_icon"
                      src={handle.logo.asset.url}
                      alt=""
                      id={"footer_social_media_icon" + index}
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
