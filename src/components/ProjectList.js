import React from "react";

import sanityClient from "../client";

import imageUrlBuilder from "@sanity/image-url";

import { motion } from "framer-motion";

import { toggleHover } from "./functions/toggleHover";

// Get a pre-configured url-builder from your sanity client
const builder = imageUrlBuilder(sanityClient);

function urlFor(source) {
  return builder.image(source);
}
function hover(e) {
  toggleHover({ e });
}

export default function Projects({ projectList }) {
  return (
    <motion.div
      className="projectList"
      layout
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {projectList &&
        projectList.map((project, index) => (
          <div key={index} className="projectList-item">
            <div className="categories">
              {project.categories &&
                project.categories.map((category, index) => (
                  <a
                    key={index}
                    id={"category_" + category.title + ""}
                    href={category.title}
                  >
                    {category.title}
                    {index + 1 !== project.categories.length ? "," : null}
                  </a>
                ))}
            </div>
            <div onMouseEnter={hover} onMouseLeave={hover}>
              {" "}
              <a href={"/projects/" + project.slug.current}>
                {project.title ? project.title : "undefined"}
              </a>
              {project.mainImage.hotspot ? (
                <img
                  src={urlFor(project.mainImage.asset.url)
                    .width(500)
                    .height(300)
                    .url()}
                  alt={project.mainImage.alt}
                  style={{
                    objectPosition: `${project.mainImage.hotspot.x * 100}% ${
                      project.mainImage.hotspot.y * 100
                    }%`,
                  }}
                  className="thumbnail seeOnHover hidden"
                />
              ) : (
                <img
                  src={urlFor(project.mainImage.asset.url)
                    .width(500)
                    .height(300)
                    .url()}
                  alt={project.mainImage.alt}
                  className="thumbnail seeOnHover hidden"
                />
              )}
            </div>
            <p>{project.year ? project.year : "undefined"}</p>
          </div>
        ))}
    </motion.div>
  );
}
