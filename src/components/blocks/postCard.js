import React, { useState, useEffect } from "react";
import sanityClient from "../../client";
import { useParams } from "react-router-dom";
import BlockContent from "@sanity/block-content-to-react";
import { Link } from "react-router-dom";

import { motion, useViewportScroll, useTransform } from "framer-motion";

import imageUrlBuilder from "@sanity/image-url";

// Get a pre-configured url-builder from your sanity client
const builder = imageUrlBuilder(sanityClient);

function urlFor(source) {
  return builder.image(source);
}

export default function PostCard({ post }) {
  return (
    <motion.div
      exit={{ opacity: 0 }}
      animate={{ x: 0 }}
      key={post.slug.current}
      className="post_card"
    >
      <Link
        to={"/projects/" + post.slug.current}
        key={post.slug.current}
        className="w-full teaser-link"
      >
        <div className="details">
          <h3>{post.title}</h3>
          {post.tags.map((tag, index) => (
            <button className="tag_button" key={index} id={"tag_" + tag + ""}>
              {" "}
              {tag}{" "}
            </button>
          ))}
        </div>

        {post.mainImage.hotspot ? (
          <img
            src={urlFor(post.mainImage.asset.url)}
            alt={post.mainImage.alt}
            style={{
              objectPosition: `${post.mainImage.hotspot.x * 100}% ${
                post.mainImage.hotspot.y * 100
              }%`,
            }}
          />
        ) : (
          <img
            src={urlFor(post.mainImage.asset.url)}
            alt={post.mainImage.alt}
          />
        )}
      </Link>
    </motion.div>
  );
}
