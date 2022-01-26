import React from "react";
import sanityClient from "../../client";
// import { Image } from "react-native";

import imageUrlBuilder from "@sanity/image-url";

// Get a pre-configured url-builder from your sanity client
const builder = imageUrlBuilder(sanityClient);

function urlFor(source) {
  return builder.image(source);
}

export default function Image({ image }) {
  return (
    <>
      {image && (
        <>
          {image.hotspot ? (
            <img
              src={urlFor(image.asset)}
              key={image.asset._ref}
              alt={image.alt}
              style={{
                objectPosition: `${image.hotspot.x * 100}% ${
                  image.hotspot.y * 100
                }%`,
              }}
              // className={this.state.class}
            />
          ) : (
            <img
              src={urlFor(image.asset)}
              key={image.asset._ref}
              alt={image.alt}
            />
          )}
        </>
      )}
    </>
  );
}
