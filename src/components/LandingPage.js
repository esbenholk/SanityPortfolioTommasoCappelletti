import React, { useContext, useEffect, useState } from "react";

import sanityClient from "../client";

import imageUrlBuilder from "@sanity/image-url";

import { motion } from "framer-motion";

import Projects from "./blocks/Projects.js";

import AppContext from "../globalState";

import FeaturedCard from "./blocks/featuredCard";

import CustomCarousel from "./blocks/Carousel";

import ProductCard from "./blocks/productCard";

import useWindowDimensions from "./functions/useWindowDimensions";

const builder = imageUrlBuilder(sanityClient);

function urlFor(source) {
  return builder.image(source);
}

export default function LandingPage() {
  const myContext = useContext(AppContext);
  const info = myContext.siteSettings;
  const projectList = myContext.projectList;

  const { width } = useWindowDimensions();

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
      {info.mainImage ? (
        <>
          {info.mainImage.hotspot ? (
            <img
              src={urlFor(info.mainImage.asset.url)}
              alt={info.mainImage.alt}
              style={{
                objectPosition: `${info.mainImage.hotspot.x * 100}% ${
                  info.mainImage.hotspot.y * 100
                }%`,
              }}
              className="mainImage"
            />
          ) : (
            <img
              src={urlFor(info.mainImage.asset.url)}
              alt={info.mainImage.alt}
              className="mainImage"
            />
          )}

          {myContext.hasFeaturedPosts && featuredProjects ? (
            <div className="regContainer">
              <motion.h1 className="headline flex-column">
                Latest Projects
              </motion.h1>

              {width > 900 ? (
                <CustomCarousel>
                  {featuredProjects.map((post, index) => (
                    <FeaturedCard post={post} key={index} />
                  ))}
                </CustomCarousel>
              ) : (
                <div className="horizontalScroll">
                  {featuredProjects.map((post, index) => (
                    <FeaturedCard post={post} key={index} />
                  ))}
                </div>
              )}
            </div>
          ) : null}
        </>
      ) : null}

      {projectList ? (
        <div className="regContainer">
          <motion.h1 className="flex-column">More skills and ideas</motion.h1>
          <motion.h1 className="subheadline flex-column">
            What do you want to see more of?
          </motion.h1>
          <Projects projectList={projectList} />
        </div>
      ) : null}

      <div className="regContainer">
        <motion.h1 className="flex-column">Others also viewed</motion.h1>

        <div className="horizontalScroll">
          {projectList.map((post, index) => (
            <ProductCard post={post} key={index} />
          ))}
        </div>
      </div>
    </motion.div>
  );
}
