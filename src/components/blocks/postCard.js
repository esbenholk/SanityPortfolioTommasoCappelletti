import React, { useState } from "react";
import sanityClient from "../../client";

import { Link } from "react-router-dom";

import imageUrlBuilder from "@sanity/image-url";

import BlockContent from "@sanity/block-content-to-react";

// Get a pre-configured url-builder from your sanity client
const builder = imageUrlBuilder(sanityClient);

function urlFor(source) {
  return builder.image(source);
}

export default function PostCard({ post }) {
  const [isShown, setIsShown] = useState(false);

  var color;
  if (post.color) {
    color = "#" + post.color;
  } else {
    color = "#FFFFFF";
  }

  return (
    <div
      className="post_card"
      onMouseEnter={() => setIsShown(true)}
      onMouseLeave={() => setIsShown(false)}
    >
      {isShown && (
        <div
          className="post_card_overlay seeOnHover"
          style={{ backgroundColor: color }}
        >
          <div className="details">
            <Link
              to={"/projects/" + post.slug.current}
              key={post.slug.current}
              className="w-full teaser-link"
            >
              <h3>{post.title}</h3>
            </Link>

            <div className="flex-row">
              {post.tags &&
                post.tags.map((tag, index) => (
                  <p className="tag" key={index} id={"tag_" + tag + ""}>
                    {tag}
                    {index + 1 !== post.tags.length ? "," : null}
                  </p>
                ))}
            </div>

            {post.recap && (
              <div className="recap">
                <BlockContent
                  blocks={post.recap}
                  projectId="swdt1dj3"
                  dataset="production"
                />
              </div>
            )}
          </div>
          <div className="flex-row">
            {post.categories &&
              post.categories.map((category, index) => (
                <p
                  className="standard-button"
                  key={index}
                  id={"category_" + category.title + ""}
                >
                  {" "}
                  {category.title}{" "}
                </p>
              ))}
          </div>
          <Link
            to={"/projects/" + post.slug.current}
            key={post.slug.current}
            className="w-full teaser-link"
          >
            <h3>check out the project</h3>
          </Link>
        </div>
      )}

      {post.mainImage.hotspot ? (
        <img
          src={urlFor(post.mainImage.asset.url)}
          alt={post.mainImage.alt}
          style={{
            objectPosition: `${post.mainImage.hotspot.x * 100}% ${
              post.mainImage.hotspot.y * 100
            }%`,
          }}
          className="post_card_image"
        />
      ) : (
        <img
          src={urlFor(post.mainImage.asset.url)}
          alt={post.mainImage.alt}
          className="post_card_image"
        />
      )}
    </div>
  );
}
