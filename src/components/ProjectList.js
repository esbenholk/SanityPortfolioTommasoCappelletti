import React from "react";

import sanityClient from "../client";

import imageUrlBuilder from "@sanity/image-url";

// Get a pre-configured url-builder from your sanity client
const builder = imageUrlBuilder(sanityClient);

// Then we like to make a simple function like this that gives the
// builder an image and returns the builder for you to specify additional
// parameters:
function urlFor(source) {
  return builder.image(source);
}

function toggleHover(e) {
  const thumbnail = e.target.parentNode.getElementsByTagName("img")[0];

  if (thumbnail.classList.contains("hidden")) {
    thumbnail.classList.remove("hidden");
    thumbnail.classList.add("visible");
  } else if (thumbnail.classList.contains("visible")) {
    thumbnail.classList.remove("visible");
    thumbnail.classList.add("hidden");
  }
  console.log("thumbnail", thumbnail, thumbnail.class);
}

export default function Projects({ projectList }) {
  return (
    <div className="projectList">
      {projectList &&
        projectList.map((project, index) => (
          <div key={index} className="projectList-item">
            <p className="category">
              {project.categories[0]
                ? project.categories[0].title
                : "undefined"}
            </p>
            <div onMouseEnter={toggleHover} onMouseLeave={toggleHover}>
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
                  className="thumbnail hidden"
                />
              ) : (
                <img
                  src={urlFor(project.mainImage.asset.url)
                    .width(500)
                    .height(300)
                    .url()}
                  alt={project.mainImage.alt}
                  className="thumbnail hidden"
                />
              )}
            </div>
            <p>{project.year ? project.year : "undefined"}</p>
          </div>
        ))}
    </div>
  );
}
