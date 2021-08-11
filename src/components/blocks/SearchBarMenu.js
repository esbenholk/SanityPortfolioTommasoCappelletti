import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

import * as Menu from "@radix-ui/react-dropdown-menu";

export default function SearchBarMenu({ categories }) {
  const [open, setOpen] = React.useState(false);

  const duration = 1;
  const exitDuration = duration / 2; // exit duration should be faster than entry

  return (
    <>
      <div className="searchbarMenu flex-row">
        <Menu.Root open={open} onOpenChange={(value) => setOpen(value)}>
          <Menu.Trigger className="menu-trigger">
            {open ? (
              <div className="flex-row no-wrap">
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
              <div className="flex-row">
                <img
                  src="assets\map-search@2x.png"
                  alt="search icon"
                  style={{ height: "24px" }}
                ></img>
                <p style={{ paddingLeft: "40px" }}>Looking for a designer?</p>
              </div>
            )}
          </Menu.Trigger>

          <AnimatePresence>
            {open && (
              <Menu.Content
                forceMount={false}
                align="start"
                className="menu-content"
                as={motion.div}
                initial={{ height: 0, width: "100%" }}
                animate={{ height: "auto", width: "100%" }}
                transition={{ duration }}
                disableOutsideScroll={false}
                disableOutsidePointerEvents={false}
                exit={{
                  height: 0,
                  width: "100%",
                  transition: { duration: exitDuration },
                }}
              >
                {categories &&
                  categories.map((category, index) => (
                    <a
                      href={category}
                      className="tag_button"
                      key={index}
                      id={"category_" + category + ""}
                    >
                      <p style={{ paddingLeft: "84px" }}>{category}</p>
                    </a>
                  ))}
              </Menu.Content>
            )}
          </AnimatePresence>
        </Menu.Root>
      </div>
    </>
  );
}
