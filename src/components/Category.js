import React, { useEffect, useState } from "react";
import { Suspense } from "react";
import sanityClient from "../client";
import { useParams } from "react-router-dom";
import ProductCard from "./blocks/productCard";

import Masonry from "react-masonry-css";

import BlockContent from "@sanity/block-content-to-react";

const breakpointColumnsObj = {
  default: 3,
  1300: 2,
  600: 2,
};

export default function Category() {
  const { slug } = useParams();
  const [projectList, setProjectList] = useState();
  const [category, setCategory] = useState();

  useEffect(() => {
    sanityClient
      .fetch(
        `*[_type == "category" && slug.current=="${slug}"]{ title, slug, description}`
      )
      .then((data) => {
        setCategory(data[0]);
      })
      .catch(console.error);
    sanityClient
      .fetch(
        `*[_type == "project" && (*[_type == "category"&&slug.current=="${slug}"][0]._id in categories[]._ref)]{slug, categories[]->{title}, title, mainImage{asset->{_id,url}, hotspot, alt}, productImage{asset->{_id,url}, hotspot, alt}, year, abbreviated_year, star_rating, tags, color, recap, yearString}`
      )
      .then((data) => {
        setProjectList(data);
      })
      .catch(console.error);
  }, [slug]);

  return (
    <div className="content-container ">
      <div className="fullWidthPadded category_details">
        {category && category.title ? <h2>{category.title}</h2> : null}
        {category && category.description ? (
          <div className="blockContent">
            <BlockContent
              blocks={category.description}
              projectId="swdt1dj3"
              dataset="production"
            />
          </div>
        ) : null}
      </div>

      <Suspense fallback={null}>
        {projectList ? (
          <Masonry
            breakpointCols={breakpointColumnsObj}
            className="my-masonry-grid fullWidthPadded category_sorting"
            columnClassName="my-masonry-grid_column"
          >
            {projectList.map((post, index) => (
              <ProductCard
                post={post}
                key={index}
                classssss={"product_card_in_grid"}
              />
            ))}
          </Masonry>
        ) : null}
      </Suspense>
    </div>
  );
}
