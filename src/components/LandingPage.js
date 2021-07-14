import React from "react";

import sanityClient from "../client";

import imageUrlBuilder from "@sanity/image-url";

import { motion } from "framer-motion";

import Projects from "./blocks/Projects.js";

// Get a pre-configured url-builder from your sanity client
const builder = imageUrlBuilder(sanityClient);

// Then we like to make a simple function like this that gives the
// builder an image and returns the builder for you to specify additional
// parameters:
function urlFor(source) {
  return builder.image(source);
}

export default function LandingPage({ info, projectList }) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.h1 className="headline">{info.title}</motion.h1>

      <img
        className="mainImage"
        src={urlFor(info.mainImage.asset.url)}
        alt=""
      />

      <Projects projectList={projectList} />
    </motion.div>
  );
}
