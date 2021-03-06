import React from "react";
import sanityClient from "../../client";

import { Link } from "react-router-dom";

import imageUrlBuilder from "@sanity/image-url";

import useWindowDimensions from "../functions/useWindowDimensions";
// Get a pre-configured url-builder from your sanity client
const builder = imageUrlBuilder(sanityClient);

function urlFor(source) {
  return builder.image(source);
}

export default function FeaturedCard({ post }) {
  const { width } = useWindowDimensions();

  var color;
  if (post.color) {
    color = post.color;
  } else {
    color = "#FFFFFF";
  }

  return (
    <div className="featured_post_card">
      {post.mainImage.hotspot ? (
        <img
          src={urlFor(post.mainImage.asset.url)}
          alt={post.mainImage.alt}
          style={{
            objectPosition: `${post.mainImage.hotspot.x * 100}% ${
              post.mainImage.hotspot.y * 100
            }%`,
          }}
          className="featured_post_card_image"
        />
      ) : (
        <img
          src={urlFor(post.mainImage.asset.url)}
          alt={post.mainImage.alt}
          className="featured_post_card_image"
        />
      )}
      <div
        className="featured_post_card_overlay"
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

          <div className="flex-row featuredCardTags">
            {post.tags &&
              post.tags.map((tag, index) => (
                <p className="featuredCardTag" key={index}>
                  {tag}
                  {index + 1 !== post.tags.length ? "," : null}
                </p>
              ))}
          </div>
        </div>
        <div className="flex-row post_category_list">
          {post.categories &&
            post.categories.map((category, index) => (
              <a
                className="standardTransparent-button"
                key={index}
                href={category.slug.current}
              >
                {" "}
                {category.title}{" "}
              </a>
            ))}
        </div>

        {width < 900 ? (
          <Link
            to={"/projects/" + post.slug.current}
            key={post.slug.current}
            className="w-full teaser-link"
          >
            <img
              src="assets/Arrowright.svg"
              className="arrow"
              alt="right arrow button"
            />
          </Link>
        ) : null}
      </div>
    </div>
  );
}
