import React, { useContext } from "react";

import AppContext from "../globalState";
import { motion } from "framer-motion";

import BlockContent from "./blocks/BlockContent";

import useWindowDimensions from "./functions/useWindowDimensions";

import Image from "./blocks/image";

export default function Home() {
  const myContext = useContext(AppContext);
  const info = myContext.siteSettings;
  const { width } = useWindowDimensions();

  function ShowDetails() {
    return (
      <div className="flex-row align-top justifyBetween contactDetails">
        {info && (
          <>
            <div className="flex-column">
              {info.contactHours ? <h2>Opening Hours</h2> : null}

              {info.contactHours ? (
                <div className="contact_detail_content">
                  <BlockContent blocks={info.contactHours} />
                </div>
              ) : null}
            </div>
            <div className="flex-column">
              {info.contactDetails ? <h2>Contact</h2> : null}

              {info.contactDetails ? (
                <div className="contact_detail_content">
                  <BlockContent blocks={info.contactDetails} />
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
          </>
        )}
      </div>
    );
  }

  return (
    <div>
      <div
        className={
          width > 900
            ? "content-container fullWidthPadded"
            : "content-container"
        }
      >
        {info ? (
          <div className="flex-row align-top">
            {width > 900 && info.authorImage ? (
              <Image image={info.authorImage} class={"authorImage"} />
            ) : null}
            <div className="aboutSection">
              <div>
                <motion.h1
                  className={
                    width < 900 ? "headline  fullWidthPadded" : "headline "
                  }
                >
                  About Tomato Cappelletti
                </motion.h1>

                {width < 900 && info.authorImage ? (
                  <Image
                    image={info.authorImage}
                    class={"mainImage fullwidth authorImage"}
                  />
                ) : null}

                {info.about ? (
                  <div
                    className={
                      width < 900
                        ? "content aboutContent fullWidthPadded"
                        : "content aboutContent"
                    }
                  >
                    <BlockContent blocks={info.about} />
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
