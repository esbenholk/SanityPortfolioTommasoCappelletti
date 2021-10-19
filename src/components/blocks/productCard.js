import React, { useState } from "react";
import sanityClient from "../../client";

import { Link } from "react-router-dom";

import imageUrlBuilder from "@sanity/image-url";

// Get a pre-configured url-builder from your sanity client
const builder = imageUrlBuilder(sanityClient);

function urlFor(source) {
  return builder.image(source);
}

export default function ProductCard({ post }) {
  const [isShown, setIsShown] = useState(false);

  var color;
  if (post.color) {
    color = post.color;
  } else {
    color = "#FFFFFF";
  }

  return (
    <div className="product_card">
      <Link
        to={"/projects/" + post.slug.current}
        key={post.slug.current + "productCard"}
        className="w-full teaser-link"
        onMouseEnter={() => setIsShown(true)}
        onMouseLeave={() => setIsShown(false)}
      >
        {post.productImage ? (
          <div className="product_card_image">
            {isShown ? (
              <>
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
              </>
            ) : (
              <>
                {post.productImage.hotspot && post.mainImage ? (
                  <img
                    src={urlFor(post.productImage.asset.url)}
                    alt={post.mainImage.alt}
                    style={{
                      objectPosition: `${post.productImage.hotspot.x * 100}% ${
                        post.mainImage.hotspot.y * 100
                      }%`,
                    }}
                  />
                ) : (
                  <img
                    src={urlFor(post.productImage.asset.url)}
                    alt={post.productImage.alt}
                  />
                )}
              </>
            )}
          </div>
        ) : (
          <>
            {post.mainImage.hotspot ? (
              <img
                src={urlFor(post.mainImage.asset.url)}
                alt={post.mainImage.alt}
                style={{
                  objectPosition: `${post.mainImage.hotspot.x * 100}% ${
                    post.mainImage.hotspot.y * 100
                  }%`,
                }}
                className="product_card_image"
              />
            ) : (
              <img
                src={urlFor(post.mainImage.asset.url)}
                alt={post.mainImage.alt}
                className="product_card_image"
              />
            )}
          </>
        )}
      </Link>

      <div className="details" style={{ color: color }}>
        <h1>{post.title}</h1>

        <div className="flex-row align-left">
          {post.tags &&
            post.tags.map((tag, index) => (
              <p className="tag" key={index}>
                {tag}
                {index + 1 !== post.tags.length ? "," : null}
              </p>
            ))}
        </div>
        {post.abbreviated_year ? (
          <>
            <div className="year_price flex-row align-top">
              <p>Y'</p>
              <p>{post.abbreviated_year}</p>
            </div>
          </>
        ) : null}
        {post.star_rating ? <p className="stars">{post.star_rating}</p> : null}
      </div>
    </div>
  );
}
