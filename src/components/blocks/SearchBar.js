import React from "react";
import { useState } from "react";
import { motion, AnimateSharedLayout, AnimatePresence } from "framer-motion";

export default function SearchBar({ categories }) {
  function Item() {
    const [isOpen, setIsOpen] = useState(false);
    const [height, setHeight] = useState("45px");

    const toggleOpen = () => {
      setIsOpen(!isOpen);
      if (height === "45px") {
        setHeight("auto");
      } else {
        setHeight("45px");
      }
    };

    return (
      <motion.li
        layout
        onClick={toggleOpen}
        className="menu-item"
        style={{ height: height }}
      >
        {isOpen ? (
          <div className="flex-row no-wrap" style={{ height: "24px" }}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 33"
            >
              <g
                id="Group_137"
                data-name="Group 137"
                transform="translate(-838.988 -94)"
              >
                <path
                  id="Icon_ionic-md-close"
                  data-name="Icon ionic-md-close"
                  d="M28.477,9.619l-2.1-2.1L18,15.9,9.619,7.523l-2.1,2.1L15.9,18,7.523,26.381l2.1,2.1L18,20.1l8.381,8.381,2.1-2.1L20.1,18Z"
                  transform="translate(832.172 93.5)"
                  stroke="#000"
                  strokeWidth="1"
                />
              </g>
            </svg>
            <p style={{ paddingLeft: "40px" }}>
              {" "}
              Which skill are you looking for?
            </p>
          </div>
        ) : (
          <div className="flex-row no-wrap">
            <img
              src="assets\map-search@2x.png"
              alt="search icon"
              style={{ height: "24px" }}
            ></img>
            <p style={{ paddingLeft: "40px" }}>Looking for a designer?</p>
          </div>
        )}
        <AnimatePresence>{isOpen && <Content />}</AnimatePresence>
      </motion.li>
    );
  }

  function Content() {
    return (
      <motion.div
        layout
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        style={{ marginTop: "30px" }}
      >
        {categories &&
          categories.map((category, index) => (
            <a
              href={category}
              className="tag_button "
              key={index}
              id={"category_" + category + ""}
            >
              <p style={{ paddingLeft: "64px" }}>{category}</p>
            </a>
          ))}
      </motion.div>
    );
  }

  const items = [0];
  return (
    <AnimateSharedLayout>
      {items.map((item) => (
        <Item key={item} />
      ))}
    </AnimateSharedLayout>
  );
}
