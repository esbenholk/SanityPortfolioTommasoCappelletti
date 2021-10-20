import React, { useState, useEffect } from "react";
import sanityClient from "../client";
import { useParams } from "react-router-dom";
import BlockContent from "@sanity/block-content-to-react";
import ProductCard from "./blocks/productCard";

import imageUrlBuilder from "@sanity/image-url";
import { motion } from "framer-motion";

import Masonry from "react-masonry-css";

const breakpointColumnsObj = {
  default: 2,
};

// Get a pre-configured url-builder from your sanity client
const builder = imageUrlBuilder(sanityClient);

function urlFor(source) {
  return builder.image(source);
}

export default function SinglePost() {
  const [singlePost, setSinglePost] = useState();
  const [relatedPost, setRelatedPost] = useState();
  const { slug } = useParams();

  useEffect(() => {
    sanityClient
      .fetch(
        `*[slug.current == "${slug}"]{
          title,mainImage{asset->{_id,url}, hotspot, alt}, productImage{asset->{_id,url}, hotspot, alt}, body, year, abbreviated_year, imagesGallery, star_rating ,slug, categories[]->{title}, tags, color, recap, yearString
        }`
      )
      .then((data) => {
        setSinglePost(data[0]);
        console.log("get single post", data[0]);

        sanityClient
          .fetch(
            '*[_type == "project"]{title,mainImage{asset->{_id,url}, hotspot, alt}, productImage{asset->{_id,url}, hotspot, alt}, year, abbreviated_year, star_rating ,slug, categories[]->{title}, tags, color, recap, yearString}'
          )
          .then((relatedData) => {
            const relatedProjects = [];
            console.log("related data", relatedData);
            for (let index = 0; index < relatedData.length; index++) {
              const post = relatedData[index];
              if (post.title !== data[0].title) {
                if (
                  post.tags &&
                  post.tags.some((r) => data[0].tags.includes(r))
                ) {
                  relatedProjects.push(post);
                  console.log("shares tags", post);
                }
              }
            }

            setRelatedPost(relatedProjects);
          })
          .catch(console.error);
      })
      .catch(console.error);
  }, [slug]);

  if (!singlePost) return <div>Loading...</div>;

  return (
    <>
      <motion.div
        layout
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fullWidthPadded"
      >
        <article className="flex-row align-top">
          <div className="flex-column contentColumn">
            {singlePost.imagesGallery ? (
              <Masonry
                breakpointCols={breakpointColumnsObj}
                className="my-masonry-grid "
                columnClassName="my-masonry-grid_column singleProjectMasonry"
              >
                {singlePost.imagesGallery.map((image, index) => (
                  <>
                    <div className="squareImage">
                      {image.hotspot ? (
                        <img
                          src={urlFor(image.asset)}
                          alt={image.alt}
                          style={{
                            objectPosition: `${image.hotspot.x * 100}% ${
                              image.hotspot.y * 100
                            }%`,
                          }}
                        />
                      ) : (
                        <img src={urlFor(image.asset)} alt={image.alt} />
                      )}
                    </div>
                  </>
                ))}
              </Masonry>
            ) : (
              <>
                {singlePost.mainImage ? (
                  <>
                    {singlePost.mainImage.hotspot ? (
                      <img
                        src={urlFor(singlePost.mainImage.asset.url)}
                        alt={singlePost.mainImage.alt}
                        style={{
                          objectPosition: `${
                            singlePost.mainImage.hotspot.x * 100
                          }% ${singlePost.mainImage.hotspot.y * 100}%`,
                        }}
                        className="mainImage fullWidthPadded fullwidth"
                      />
                    ) : (
                      <img
                        src={urlFor(singlePost.mainImage.asset.url)}
                        alt={singlePost.mainImage.alt}
                        className="mainImage fullWidthPadded fullwidth"
                      />
                    )}
                  </>
                ) : null}
              </>
            )}

            {singlePost.recap && (
              <div className="recap">
                <BlockContent
                  blocks={singlePost.recap}
                  projectId="swdt1dj3"
                  dataset="production"
                />
              </div>
            )}

            {singlePost.body && (
              <div className="content">
                <div className="flex-row justifyBetween">
                  <h2>Project details</h2>
                  <img
                    src="../assets/Arrowright.svg"
                    className="arrow"
                    alt="down arrow button"
                    style={{ transform: "rotate(90deg)" }}
                  />
                </div>

                <BlockContent
                  blocks={singlePost.body}
                  projectId="swdt1dj3"
                  dataset="production"
                />
              </div>
            )}
          </div>
          <div className="flex-column detailColumn">
            <header>
              <h1>{singlePost.title}</h1>
            </header>
          </div>
        </article>
      </motion.div>
      <div className="regContainer">
        {relatedPost ? (
          <>
            <motion.h1 className="flex-column fullWidthPadded">
              Related Projects
            </motion.h1>
            <div className="overscrollPadded horizontalScroll2">
              {relatedPost.map((post, index) => (
                <ProductCard post={post} key={index} />
              ))}
            </div>
          </>
        ) : null}
      </div>
    </>
  );
}
