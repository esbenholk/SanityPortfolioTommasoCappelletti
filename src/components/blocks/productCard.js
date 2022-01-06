import React, { useState } from "react";

import { Link } from "react-router-dom";

import Image from "./image";

export default function ProductCard({ post, classssss }) {
  const [isShown, setIsShown] = useState(false);
  const [isOnSale, setIsOnSale] = useState(false);
  console.log(post);
  if (post.categories) {
    for (let index = 0; index < post.categories.length; index++) {
      const category = post.categories[index];
      if (category.title === "On Sale" || category.title === "On sale") {
        setIsOnSale(true);
      }
    }
  }

  var color;
  if (post.color) {
    color = post.color;
  } else {
    color = "#FFFFFF";
  }

  return (
    <div className={"product_card"}>
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
              <div className="squareImage">
                <h1 style={{ display: "none" }}>hej</h1>
                <Image image={post.mainImage} />
              </div>
            ) : (
              <div className="squareImage">
                <Image image={post.productImage} />
              </div>
            )}
          </div>
        ) : (
          <div className="squareImage">
            <Image image={post.mainImage} />
          </div>
        )}
      </Link>

      <div className="details" style={{ color: color }}>
        <h1>{post.title}</h1>

        <div className="flex-row align-left">
          {post.tags ? (
            post.tags.map((tag, index) => (
              <p className="tag" key={index}>
                {tag}
                {index + 1 !== post.tags.length ? "," : null}
              </p>
            ))
          ) : (
            <p className="tag" style={{ visibility: "hidden" }}>
              tag
            </p>
          )}
        </div>
        {post.abbreviated_year ? (
          <>
            <div className="year_price flex-row align-top">
              <p>20</p>
              <p>{post.abbreviated_year}</p>
            </div>
          </>
        ) : null}
        {post.star_rating ? <p className="stars">{post.star_rating}</p> : null}
        {isOnSale ? <p>On Sale</p> : null}
      </div>
    </div>
  );
}
