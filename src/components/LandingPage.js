import React, { useContext, useEffect, useState } from "react";

import { motion } from "framer-motion";

import Projects from "./blocks/Projects";

import AppContext from "../globalState";

import FeaturedCard from "./blocks/featuredCard";

import CustomCarousel from "./blocks/Carousel";
import Image from "./blocks/image";

import useWindowDimensions from "./functions/useWindowDimensions";

export default function LandingPage() {
  const myContext = useContext(AppContext);
  const info = myContext.siteSettings;
  const projectList = myContext.projectList;
  const { width } = useWindowDimensions();
  console.log(info);

  const [featuredProjects, setFeaturedProjects] = useState([]);

  useEffect(() => {
    if (myContext.hasFeaturedPosts === true && projectList) {
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
    // layout
    // initial={{ opacity: 0 }}
    // animate={{ opacity: 1 }}
    // exit={{ opacity: 0 }}
    >
      <motion.h1 className="headline flex-column fullWidthPadded">
        {info.greeting}
      </motion.h1>

      <>
        {info.mainImages ? (
          <div className="fullWidthPadded">
            <CustomCarousel
              arrows={false}
              swipe={true}
              classsss={""}
              autoplay={true}
            >
              {info.mainImages.map((image, index) => (
                <div key={index}>
                  <Image image={image} class={"mainImage fullwidth"} />
                </div>
              ))}
            </CustomCarousel>{" "}
          </div>
        ) : (
          <>
            {info.mainImage ? (
              <div className="fullWidthPadded">
                <Image image={info.mainImage} class={"mainImage fullwidth"} />
              </div>
            ) : null}{" "}
          </>
        )}
      </>

      {myContext.hasFeaturedPosts && featuredProjects ? (
        <div className="regContainer">
          <motion.h1 className="headline flex-column fullWidthPadded">
            Latest Projects
          </motion.h1>

          {width > 900 ? (
            <div className="fullWidthPadded">
              <CustomCarousel
                arrows={true}
                classsss={"featured_post_container"}
              >
                {featuredProjects.map((post, index) => (
                  <FeaturedCard post={post} key={index} />
                ))}
              </CustomCarousel>
            </div>
          ) : (
            <div className="horizontalScroll overscrollPadded">
              {featuredProjects.map((post, index) => (
                <FeaturedCard post={post} key={index} />
              ))}
            </div>
          )}
        </div>
      ) : null}

      {projectList ? (
        <div className="regContainer">
          <motion.h1 className="flex-column fullWidthPadded noMargin">
            More skills and ideas
          </motion.h1>
          <motion.h1 className="subheadline flex-column fullWidthPadded">
            What do you want to see more of?
          </motion.h1>
          <Projects
            projectList={projectList}
            show_categories={true}
            postcard={true}
          />
        </div>
      ) : null}
    </motion.div>
  );
}
