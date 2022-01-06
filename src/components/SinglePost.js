import React, { useState, useEffect, useRef } from "react";
import sanityClient from "../client";
import { useParams } from "react-router-dom";
// import BlockContent from "@sanity/block-content-to-react";
import ProductCard from "./blocks/productCard";
import AddToCartButton from "./blocks/addToCart";
import { motion } from "framer-motion";
import Image from "./blocks/image";
import CustomCarousel from "./blocks/Carousel";
import { Link } from "react-router-dom";

import BlockContent from "./blocks/BlockContent";

import Masonry from "react-masonry-css";

import useWindowDimensions from "./functions/useWindowDimensions";

import Loader from "./blocks/loader";

const breakpointColumnsObj = {
  default: 2,
};

export default function SinglePost({ updatebasket, basket }) {
  const [singlePost, setSinglePost] = useState();
  const [relatedPost, setRelatedPost] = useState();
  const { slug } = useParams();
  const { width } = useWindowDimensions();

  const fullArticleRef = useRef();
  const fixedRef = useRef();

  const [hasScrolledinPosition, sethasScrolledinPosition] = useState(false);

  useEffect(() => {
    sanityClient
      .fetch(
        `*[slug.current == "${slug}"]{
          title,mainImage{asset->{_id,url}, hotspot, alt}, productImage{asset->{_id,url}, hotspot, alt}, body, year, abbreviated_year, imagesGallery, star_rating ,slug, categories[]->{title, slug}, tags, color, recap, yearString, client, link, downloadfile{asset->{url}}, freebie
        }`
      )
      .then((data) => {
        setSinglePost(data[0]);
        sanityClient
          .fetch(
            '*[_type == "project"]{title,mainImage{asset->{_id,url}, hotspot, alt}, productImage{asset->{_id,url}, hotspot, alt}, year, abbreviated_year, star_rating ,slug, categories[]->{title, slug}, tags, color, recap, yearString}'
          )
          .then((relatedData) => {
            const relatedProjects = [];
            if (data[0] && data[0].tags) {
              for (let index = 0; index < relatedData.length; index++) {
                const post = relatedData[index];
                if (post.title !== data[0].title) {
                  if (
                    post.tags &&
                    post.tags.some((r) => data[0].tags.includes(r))
                  ) {
                    relatedProjects.push(post);
                  }
                }
              }
              setRelatedPost(relatedProjects);
            }
          })
          .catch(console.error);
      })
      .catch(console.error);
  }, [slug]);

  function listenScrollEvent() {
    if (window.scrollY > 240) {
      sethasScrolledinPosition(true);
    } else {
      sethasScrolledinPosition(false);
    }
  }

  window.addEventListener("scroll", listenScrollEvent);

  if (!singlePost) return <Loader />;

  return (
    <>
      <motion.div
      // layout
      // initial={{ opacity: 0 }}
      // animate={{ opacity: 1 }}
      // exit={{ opacity: 0 }}
      >
        <article ref={fullArticleRef}>
          <div className="flex-row align-top project_directory_line fullWidthPadded">
            <a href="/projects">{"Project >"}</a>
            <div className="flex-row align-left">
              {singlePost.categories &&
                singlePost.categories.map((category, index) => (
                  <Link
                    to={"../" + category.slug.current}
                    className="tag project_tag"
                    key={index}
                  >
                    {category.title}
                    {index + 1 !== singlePost.categories.length ? "," : null}
                  </Link>
                ))}
              <p>{" > "}</p>
            </div>
            <p>{singlePost.title}</p>
          </div>
          <div className="flex-row align-top justifyBetween">
            <div className="flex-column contentColumn">
              {width < 600 ? (
                <>
                  {singlePost.imagesGallery ? (
                    <CustomCarousel arrows={false} swipe={true} classsss={""}>
                      {singlePost.imagesGallery.map((image, index) => (
                        <div className="squareImage" key={index}>
                          <Image image={image} />
                        </div>
                      ))}
                    </CustomCarousel>
                  ) : (
                    <>
                      <Image
                        image={singlePost.mainImage}
                        class={"mainImage fullwidth"}
                      />
                    </>
                  )}
                </>
              ) : (
                <>
                  {singlePost.imagesGallery ? (
                    <Masonry
                      breakpointCols={breakpointColumnsObj}
                      className="my-masonry-grid fullWidthPadded"
                      columnClassName="my-masonry-grid_column singleProjectMasonry"
                    >
                      {singlePost.imagesGallery.map((image, index) => (
                        <div className="squareImage" key={index}>
                          <Image image={image} />
                        </div>
                      ))}
                    </Masonry>
                  ) : (
                    <>
                      <Image
                        image={singlePost.mainImage}
                        class={"mainImage fullwidth fullWidthPadded"}
                      />
                    </>
                  )}
                </>
              )}
            </div>
            <div
              className={
                hasScrolledinPosition & (width > 1200)
                  ? `flex-column detailColumnfixed fullWidthPadded `
                  : `flex-column detailColumn fullWidthPadded `
              }
              ref={fixedRef}
            >
              <header className="flex-row align-top justifyBetween">
                <h2 className="projectTitle">{singlePost.title}</h2>
                {singlePost.abbreviated_year ? (
                  <>
                    <div className="project_year_price year_price flex-row align-top">
                      <p>20</p>
                      <p>{singlePost.abbreviated_year}</p>
                    </div>
                  </>
                ) : null}
              </header>

              <div className="flex-row align-left project_tags">
                {singlePost.tags &&
                  singlePost.tags.map((tag, index) => (
                    <p className="tag project_tag" key={index}>
                      {tag}
                      {index + 1 !== singlePost.tags.length ? "," : null}
                    </p>
                  ))}
              </div>

              {singlePost.star_rating ? (
                <p className="stars">{singlePost.star_rating}</p>
              ) : null}

              <AddToCartButton
                project={singlePost}
                updatebasket={updatebasket}
                basket={basket}
              />
              {singlePost.freebie && (
                <>
                  {singlePost.link ? (
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        window.location.href = singlePost.link;
                      }}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="addToCartButton yellow"
                    >
                      Get this freebie
                    </button>
                  ) : null}
                  {singlePost.downloadfile.asset.url ? (
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        window.location.href = `${singlePost.downloadfile.asset.url}?dl=`;
                      }}
                      className="addToCartButton yellow"
                    >
                      Get this freebie
                    </button>
                  ) : null}
                </>
              )}

              {width < 1200 ? (
                <>
                  {" "}
                  {singlePost.recap && (
                    <div className="recap">
                      <BlockContent blocks={singlePost.recap} />
                    </div>
                  )}
                </>
              ) : null}

              <div className="flex-column project_details ">
                {singlePost.client && (
                  <>
                    <h3>Client</h3>
                    <p className="project_tag">{singlePost.client}</p>
                  </>
                )}
                {singlePost.year && (
                  <>
                    <h3>Year</h3>
                    <p className="flex-row align-left project_tag">
                      {singlePost.year ? singlePost.year : "undefined"}{" "}
                      {singlePost.yearString ? (
                        <u>{singlePost.yearString}</u>
                      ) : null}
                    </p>
                  </>
                )}

                {singlePost.categories && (
                  <>
                    <h3>Category</h3>
                    <div className="flex-row align-left">
                      {singlePost.categories.map((category, index) => (
                        <Link
                          to={"../" + category.slug.current}
                          className="tag project_tag"
                          key={index}
                        >
                          {category.title}
                          {index + 1 !== singlePost.categories.length
                            ? ","
                            : null}
                        </Link>
                      ))}
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
          <div className="contentColumn fullWidthPadded">
            {width > 1200 ? (
              <>
                {" "}
                {singlePost.recap && (
                  <div className="recap">
                    <BlockContent blocks={singlePost.recap} />
                  </div>
                )}
              </>
            ) : null}

            {singlePost.body && (
              <div className="content">
                <div className="flex-row justifyBetween header">
                  <h2>Project details</h2>
                  <img
                    src="../assets/Arrowright.svg"
                    className="arrow"
                    alt="down arrow button"
                    style={{
                      transform: "rotate(90deg)",
                    }}
                  />
                </div>

                <BlockContent blocks={singlePost.body} />
              </div>
            )}
          </div>
        </article>
      </motion.div>
      <div className="regContainer" style={{ backgroundColor: "white" }}>
        {relatedPost && relatedPost.length !== 0 ? (
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
