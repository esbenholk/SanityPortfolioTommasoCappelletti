import React, { useState, useEffect } from "react";

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

///fix call for categories in project ngrok
{
  /* <p>{project.categories ? project.categories[0] : "undefined"}</p> */
}

export default function Projects({ projectList }) {
  return (
    <div>
      {projectList &&
        projectList.map((project, index) => (
          <div key={index}>
            <p>{project.title ? project.title : "undefined"}</p>
            <p>{project.year ? project.year : "undefined"}</p>
          </div>
        ))}
    </div>
  );
}
