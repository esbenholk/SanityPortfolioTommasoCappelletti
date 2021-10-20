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

  function ShowDetails() {
    return (
      <div className="flex-row align-top justifyBetween contactDetails">
        <div className="flex-column">
          {info.contactHours ? <h2>Opening Hours</h2> : null}

          {info.contactHours ? (
            <div className="blockContent">
              <BlockContent
                blocks={info.contactHours}
                projectId="swdt1dj3"
                dataset="production"
              />
            </div>
          ) : null}
        </div>
        <div className="flex-column">
          {info.contactDetails ? <h2>Contact</h2> : null}

          {info.contactDetails ? (
            <div className="blockContent">
              <BlockContent
                blocks={info.contactDetails}
                projectId="swdt1dj3"
                dataset="production"
              />
            </div>
          ) : null}
        </div>
        <div className="flex-column">
          {info.socialMediaHandles ? <h2>Follow</h2> : null}

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
    );
  }

  return (
    <div>
      <div className="content-container fullWidthPadded">
        {info ? (
          <div className="flex-row align-top">
            {width > 900 && info.authorImage ? (
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
              <div>
                <motion.h1 className="headline">
                  About Tomato Cappelletti
                </motion.h1>

                {width < 900 && info.authorImage ? (
                  <>
                    {info.authorImage.hotspot ? (
                      <img
                        src={urlFor(info.authorImage.asset.url)}
                        alt={info.authorImage.alt}
                        style={{
                          objectPosition: `${
                            info.authorImage.hotspot.x * 100
                          }% ${info.authorImage.hotspot.y * 100}%`,
                        }}
                      />
                    ) : (
                      <img
                        src={urlFor(info.authorImage.asset.url)}
                        alt={info.authorImage.alt}
                      />
                    )}
                  </>
                ) : null}

                {info.about ? (
                  <div className="aboutContent">
                    <BlockContent
                      blocks={info.about}
                      projectId="swdt1dj3"
                      dataset="production"
                    />
                  </div>
                ) : null}
              </div>

              {width > 900 ? <ShowDetails /> : null}
            </div>
          </div>
        ) : null}
      </div>
      {width < 900 ? <ShowDetails /> : null}
    </div>
  );
}
