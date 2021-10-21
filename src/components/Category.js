import React, { useEffect, useState } from "react";
import { Suspense } from "react";
import sanityClient from "../client";
import { useParams } from "react-router-dom";
import ProductCard from "./blocks/productCard";

export default function Category() {
  const { slug } = useParams();
  const [projectList, setProjectList] = useState();

  useEffect(() => {
    sanityClient
      .fetch(
        `*[_type == "project" && (*[_type == "category"&&slug.current=="${slug}"][0]._id in categories[]._ref)]{slug, categories[]->{title}, title, mainImage{asset->{_id,url}, hotspot, alt}, productImage{asset->{_id,url}, hotspot, alt}, year, abbreviated_year, star_rating, tags, color, recap, yearString}`
        // ` *[_type == "project" && category._ref in *[_type=="category" && title=="${slug}"]._id ]{title,mainImage{asset->{_id,url}, hotspot, alt}, productImage{asset->{_id,url}, hotspot, alt}, year, abbreviated_year, star_rating ,slug, categories[]->{title}, tags, color, recap, yearString}`
      )
      .then((data) => {
        setProjectList(data);
      })
      .catch(console.error);
  }, [slug]);

  return (
    <div className="content-container">
      <Suspense fallback={null}>
        {projectList ? (
          <div className="overscrollPadded">
            {projectList.map((post, index) => (
              <ProductCard post={post} key={index} />
            ))}
          </div>
        ) : null}
      </Suspense>
    </div>
  );
}
