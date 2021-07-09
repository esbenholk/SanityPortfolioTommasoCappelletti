import React, { useState, useEffect } from "react";

import sanityClient from "../client";

import imageUrlBuilder from "@sanity/image-url";

import { motion, useViewportScroll, useTransform } from "framer-motion";

import Projects from "./blocks/Projects.js";

// Get a pre-configured url-builder from your sanity client
const builder = imageUrlBuilder(sanityClient);

// Then we like to make a simple function like this that gives the
// builder an image and returns the builder for you to specify additional
// parameters:
function urlFor(source) {
  return builder.image(source);
}

export default function LandingPage({ info }) {
  const { scrollYProgress } = useViewportScroll();
  const x = useTransform(scrollYProgress, [0, 1], [0, -3000]);
  return (
    <motion.div layout>
      <img className="mainImage" src={info.mainImage.asset.url} alt="" />
      <motion.h1 style={{ x }} className="headline">
        {info.title}
      </motion.h1>
      <Projects />
    </motion.div>
  );
}
