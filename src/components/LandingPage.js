import React, { useContext, useEffect, useState } from "react";

import sanityClient from "../client";

import imageUrlBuilder from "@sanity/image-url";

import { motion } from "framer-motion";

import Projects from "./blocks/Projects.js";

import AppContext from "../globalState";

import FeaturedCard from "./blocks/featuredCard";

import CustomCarousel from "./blocks/Carousel";

import ProductCard from "./blocks/productCard";

const builder = imageUrlBuilder(sanityClient);

function urlFor(source) {
  return builder.image(source);
}

export default function LandingPage() {
  const myContext = useContext(AppContext);
  const info = myContext.siteSettings;
  const projectList = myContext.projectList;

  const [featuredProjects, setFeaturedProjects] = useState([]);

  useEffect(() => {
    if (myContext.hasFeaturedPosts === true) {
      const featuredProjects = [];
      for (let index = 0; index < projectList.length; index++) {
        const post = projectList[index];
        if (info.featuredProjects.includes(post.title)) {
          featuredProjects.push(post);
        }
      }
      setFeaturedProjects(featuredProjects);
    }
  }, [myContext.hasFeaturedPosts, projectList, info]);

  return (
    <motion.div
      layout
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.h1 className="headline flex-column">{info.greeting}</motion.h1>

      {myContext.hasFeaturedPosts && featuredProjects ? (
        <>
          <h1>HAS FEATURED PROJECTS</h1>
          <CustomCarousel>
            {featuredProjects.map((post, index) => (
              <FeaturedCard post={post} key={index} />
            ))}
          </CustomCarousel>
        </>
      ) : (
        <img
          className="mainImage"
          src={urlFor(info.mainImage.asset.url)}
          alt=""
        />
      )}

      <Projects projectList={projectList} />

      <div className="horizontalScroll">
        {projectList.map((post, index) => (
          <ProductCard post={post} key={index} />
        ))}
      </div>
    </motion.div>
  );
}
