import React, { useContext, Suspense } from "react";

import AppContext from "../globalState";
import { motion } from "framer-motion";

import sanityClient from "../client";

import imageUrlBuilder from "@sanity/image-url";

import BlockContent from "@sanity/block-content-to-react";

import useWindowDimensions from "./functions/useWindowDimensions";

const builder = imageUrlBuilder(sanityClient);

function urlFor(source) {
  return builder.image(source);
}

export default function Home() {
  const myContext = useContext(AppContext);
  const info = myContext.siteSettings;
  const { width } = useWindowDimensions();

  return (
    <div>
      <div className="content-container fullWidthPadded">
        {width > 900 && info ? (
          <div className="flex-row align-top">
            {info.authorImage ? (
              <>
                {info.authorImage.hotspot ? (
                  <img
                    src={urlFor(info.authorImage.asset.url)}
                    alt={info.authorImage.alt}
                    style={{
                      objectPosition: `${info.authorImage.hotspot.x * 100}% ${
                        info.authorImage.hotspot.y * 100
                      }%`,
                    }}
                    className="authorImage"
                  />
                ) : (
                  <img
                    src={urlFor(info.authorImage.asset.url)}
                    alt={info.authorImage.alt}
                    className="authorImage"
                  />
                )}
              </>
            ) : null}
            <div className="aboutSection">
              <motion.h1 className="headline">
                About Tomato Cappelletti
              </motion.h1>

              {info.about ? (
                <div className="blockContent">
                  <BlockContent
                    blocks={info.about}
                    projectId="swdt1dj3"
                    dataset="production"
                  />
                </div>
              ) : null}
            </div>

            <div>
              <div className="flex-column">
                {info.socialMediaHandles &&
                  info.socialMediaHandles.map((handle, index) => (
                    <a
                      href={handle.url}
                      key={index}
                      id={"category_" + handle.url + ""}
                    >
                      {handle.URLName}
                    </a>
                  ))}
              </div>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}
