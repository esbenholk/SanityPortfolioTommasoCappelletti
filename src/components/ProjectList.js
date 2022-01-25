import React, { useEffect, useState } from "react";

import sanityClient from "../client";

import imageUrlBuilder from "@sanity/image-url";

import { motion } from "framer-motion";

import { toggleHover } from "./functions/toggleHover";

import useWindowDimensions from "./functions/useWindowDimensions";

import { Link } from "react-router-dom";

// Get a pre-configured url-builder from your sanity client
const builder = imageUrlBuilder(sanityClient);

function urlFor(source) {
  return builder.image(source);
}
function hover(e) {
  toggleHover({ e });
}

export default function Projects({ projectList }) {
  const { width } = useWindowDimensions();
  const [pressList, setPressList] = useState();

  useEffect(() => {
    sanityClient
      .fetch(
        '*[_type == "press"]{title,mainImage{asset->{_id,url}, hotspot, alt}, url, year, categories[]->{title, slug}, yearString}'
      )
      .then((press) => {
        setPressList(press);
      })
      .catch(console.error);
  }, []);

  return (
    <motion.div
      className="projectList fullWidthPadded"
      // layout
      // initial={{ opacity: 0 }}
      // animate={{ opacity: 1 }}
      // exit={{ opacity: 0 }}
    >
      <div className="projectList-item">
        <h2 className="categories">Category</h2>
        <div>
          <h2>Project</h2>
        </div>
        {width > 900 ? <h2>Year</h2> : null}
      </div>
      {projectList &&
        projectList.map((project, index) => (
          <div key={index} className="projectList-item">
            <div className="categories">
              {project.categories &&
                project.categories.map((category, index) => (
                  <>
                    {category.title === "On Sale" ||
                      (category.title === "On sale" ? (
                        <></>
                      ) : (
                        <Link
                          key={index}
                          id={"category_" + category.title + ""}
                          to={category.slug.current}
                        >
                          {category.title}
                          {index + 1 !== project.categories.length
                            ? ", "
                            : null}
                        </Link>
                      ))}
                  </>
                ))}
            </div>
            <div onMouseEnter={hover} onMouseLeave={hover}>
              {" "}
              <Link to={"/projects/" + project.slug.current}>
                {project.title ? project.title : "undefined"}
              </Link>
              {project.mainImage.hotspot ? (
                <img
                  src={urlFor(project.mainImage.asset.url).url()}
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
                  src={urlFor(project.mainImage.asset.url).url()}
                  alt={project.mainImage.alt}
                  className="thumbnail seeOnHover hidden"
                />
              )}
            </div>
            {width > 900 ? (
              <p className="flex-row align-left">
                {project.year ? project.year : "undefined"}{" "}
                {project.yearString ? <u>{project.yearString}</u> : null}
              </p>
            ) : null}
          </div>
        ))}
      {pressList && (
        <div className="projectList-item" style={{ marginTop: "45px" }}>
          <h2 className="categories">Category</h2>
          <div>
            <h2>Press</h2>
          </div>
          {width > 900 ? <h2>Year</h2> : null}
        </div>
      )}
      {pressList &&
        pressList.map((project, index) => (
          <>
            <div key={index} className="projectList-item">
              <div className="categories">
                {project.categories &&
                  project.categories.map((category, index) => (
                    <>
                      {category.title === "On Sale" ||
                        (category.title === "On sale" ? (
                          <></>
                        ) : (
                          <Link
                            key={index}
                            id={"category_" + category.title + ""}
                            to={category.slug.current}
                          >
                            {category.title}
                            {index + 1 !== project.categories.length
                              ? ", "
                              : null}
                          </Link>
                        ))}
                    </>
                  ))}
              </div>
              <div onMouseEnter={hover} onMouseLeave={hover}>
                {" "}
                <a
                  href={project.url}
                  target={"_blank"}
                  rel="noopener noreferrer"
                >
                  {project.title ? project.title : "undefined"}
                </a>
                {project.mainImage.hotspot ? (
                  <img
                    src={urlFor(project.mainImage.asset.url).url()}
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
                    src={urlFor(project.mainImage.asset.url).url()}
                    alt={project.mainImage.alt}
                    className="thumbnail seeOnHover hidden"
                  />
                )}
              </div>
              {width > 900 ? (
                <p className="flex-row align-left">
                  {project.year ? project.year : "undefined"}{" "}
                  {project.yearString ? <u>{project.yearString}</u> : null}
                </p>
              ) : null}
            </div>
          </>
        ))}
    </motion.div>
  );
}
