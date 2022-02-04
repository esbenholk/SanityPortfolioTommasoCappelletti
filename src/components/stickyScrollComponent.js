import React, { useState, useEffect, useLayoutEffect, useRef } from "react";
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
import VideoPlayer from "./blocks/videoPlayer";

const breakpointColumnsObj = {
  default: 2,
};

export default function SinglePost({ updatebasket, basket }) {
  const [singlePost, setSinglePost] = useState();
  const [relatedPost, setRelatedPost] = useState();
  const [imagesGallery, setImagesGallery] = useState([]);
  const { slug } = useParams();
  const { width, height } = useWindowDimensions();

  const fixedRef = useRef();
  const endOfProject = useRef();
  const parentContainer = useRef();

  const [lightBoxIsOpen, setLightBoxIsOpen] = useState(false);
  const [lightBoxIndex, setLightBoxIndex] = useState(0);

  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    sanityClient
      .fetch(
        `*[slug.current == "${slug}"]{
          title,mainImage{asset->{_id,url}, hotspot, alt}, productImage{asset->{_id,url}, hotspot, alt}, body, year, abbreviated_year, imagesGallery, external_links, description, videos, star_rating ,slug, categories[]->{title, slug}, tags, color, recap, yearString, client, Link, downloadfile{asset->{url}}, freebie
        }`
      )
      .then((data) => {
        setSinglePost(data[0]);
        setImagesGallery(data[0].imagesGallery);
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

  function handleStickyness(node) {
    node.classList.add("detailColumnfixed");
    parentContainer.current.classList.remove("align-bottom");
  }

  function handleNormalBehaviour(node) {
    node.classList.remove("detailColumnfixed");
    parentContainer.current.classList.remove("align-bottom");
  }

  function handleStickynesssToBottom(node) {
    node.classList.remove("detailColumnfixed");
    parentContainer.current.classList.add("align-bottom");
  }

  function clearEventHandler(scrollCallBack) {
    window.removeEventListener("scroll", scrollCallBack);
  }

  useLayoutEffect(() => {
    const { current } = fixedRef;
    var scrollCallBack;

    if (current && width > 1200) {
      const originalPosition = current.offsetTop + 240;
      scrollCallBack = window.addEventListener("scroll", () => {
        const sticky = current.offsetTop + 240;
        if (window.pageYOffset > sticky) {
          if (
            endOfProject.current.getBoundingClientRect().top <
            current.offsetTop + fixedRef.current.getBoundingClientRect().height
          ) {
            handleStickynesssToBottom(current);
          } else {
            handleStickyness(current);
          }
        }
        if (current.getBoundingClientRect().top > 61) {
          handleStickyness(current);
        }

        if (window.pageYOffset <= originalPosition) {
          handleNormalBehaviour(current);
        }
      });

      return clearEventHandler(scrollCallBack);
    } else if (current) {
      handleNormalBehaviour(current);
    }
  });

  function openLightBox(index) {
    setLightBoxIndex(index);
    setLightBoxIsOpen(true);
  }
  function closeLightBox() {
    setLightBoxIsOpen(false);
  }
  function shutDownIframes() {
    var iframes = document.getElementsByTagName("iframe");
    console.log("tries to shut down iframes", iframes);
    setIsPlaying(false);

    for (let index = 0; index < iframes.length; index++) {
      const element = iframes[index];
      element.contentWindow.postMessage('{"method":"pause"}', "*");

      element.contentWindow.postMessage(
        '{"event":"command","func":"stopVideo","args":""}',
        "*"
      );
    }
  }

  if (!singlePost) return <Loader />;

  return (
    <>
      {lightBoxIsOpen && (
        <div
          style={{
            position: "fixed",
            top: "0",
            right: "0",
            height: height,
            width: width,
            zIndex: "9999999999999999",
            backgroundColor: "white",
            padding: "6%",
          }}
          className="whitebox"
        >
          <div
            onClick={(e) => {
              e.preventDefault();
              closeLightBox();
            }}
            style={{ position: "absolute", right: "3%", top: "5%" }}
          >
            <img
              src="../assets/CloseCross.svg"
              className="closeCross"
              alt="down arrow button"
              style={{
                transform: "rotate(90deg)",
              }}
            />
          </div>

          {singlePost.videos && singlePost.videos.length >= 0 ? (
            <CustomCarousel
              arrows={true}
              swipe={true}
              classsss={"whiteboxCarousel"}
              currentIndex={lightBoxIndex}
              stopVideo={shutDownIframes}
            >
              {imagesGallery.map((image, index) => (
                <Image image={image} key={index} />
              ))}

              {singlePost.videos.map((video, index) => (
                <VideoPlayer
                  video={video}
                  key={index}
                  showThumb={false}
                  isPlaying={isPlaying}
                />
              ))}
            </CustomCarousel>
          ) : (
            <CustomCarousel
              arrows={true}
              swipe={true}
              classsss={"whiteboxCarousel"}
              currentIndex={lightBoxIndex}
              stopVideo={shutDownIframes}
            >
              {imagesGallery.map((image, index) => (
                <Image image={image} key={index} />
              ))}
            </CustomCarousel>
          )}
        </div>
      )}
      <div className="flex-row project_directory_line">
        <a href="/projects" className="tag project_tag directoryTag ">
          {"Project >"}
        </a>
        {singlePost.categories && (
          <Link
            to={"../" + singlePost.categories[0].slug.current}
            className="tag project_tag directoryTag "
          >
            {singlePost.categories[0].title + " >"}
          </Link>
        )}
        <a href="none" className="tag project_tag directoryTag ">
          {singlePost.title}
        </a>
      </div>
      <div
        className="flex-row align-top justifyBetween"
        style={{ alignItems: "stretch" }}
      >
        <div
          className={
            width < 600
              ? "flex-column contentColumn"
              : "flex-column contentColumn fullWidthPaddedLeft  normPaddingMobile"
          }
        >
          {width < 600 ? (
            <>
              {imagesGallery ? (
                <>
                  {singlePost.videos && singlePost.videos.length >= 0 ? (
                    <CustomCarousel
                      arrows={false}
                      swipe={true}
                      classsss={""}
                      stopVideo={shutDownIframes}
                    >
                      {imagesGallery.map((image, index) => (
                        <div className="squareImage" key={index}>
                          <Image image={image} />
                        </div>
                      ))}

                      {singlePost.videos.map((video, index) => (
                        <div className="squareImage" key={index}>
                          <VideoPlayer video={video} showThumb={false} />
                        </div>
                      ))}
                    </CustomCarousel>
                  ) : (
                    <CustomCarousel
                      arrows={false}
                      swipe={true}
                      classsss={""}
                      stopVideo={shutDownIframes}
                    >
                      {imagesGallery.map((image, index) => (
                        <div className="squareImage" key={index}>
                          <Image image={image} />
                        </div>
                      ))}
                    </CustomCarousel>
                  )}
                </>
              ) : (
                <>
                  <div className="squareImage">
                    <Image image={singlePost.mainImage} />
                  </div>
                </>
              )}
            </>
          ) : (
            <>
              {imagesGallery ? (
                <Masonry
                  breakpointCols={breakpointColumnsObj}
                  className="my-masonry-grid"
                  columnClassName="my-masonry-grid_column singleProjectMasonry"
                >
                  {imagesGallery.map((image, index) => (
                    <div
                      className="squareImage"
                      key={index}
                      onClick={(e) => {
                        e.preventDefault();
                        openLightBox(index);
                      }}
                    >
                      <Image image={image} />
                    </div>
                  ))}

                  {singlePost.videos ? (
                    <>
                      {singlePost.videos.map((video, index) => (
                        <div
                          className="squareImage"
                          key={index}
                          onClick={(e) => {
                            e.preventDefault();
                            openLightBox(
                              singlePost.imagesGallery.length + index
                            );
                          }}
                        >
                          <VideoPlayer video={video} showThumb={true} />
                        </div>
                      ))}
                    </>
                  ) : null}
                </Masonry>
              ) : (
                <>
                  <Image
                    image={singlePost.mainImage}
                    class={
                      "mainImage fullwidth fullWidthPaddedLeft normPaddingMobile"
                    }
                  />
                </>
              )}
            </>
          )}
          <div className="content">
            <div className="">
              {width > 1200 ? (
                <>
                  {singlePost.recap && (
                    <div className="recap">
                      <BlockContent blocks={singlePost.recap} />
                    </div>
                  )}
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
                </>
              ) : null}
            </div>
          </div>
        </div>
        <div
          className="flex-column detailColumn normPaddingMobile"
          ref={parentContainer}
        >
          <div ref={fixedRef} className={"flex-column details"}>
            <header className="flex-row align-top justifyBetween no-wrap">
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
                {singlePost.Link ? (
                  <>
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        window.location.href = singlePost.Link;
                      }}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="addToCartButton yellow"
                    >
                      Get this freebie
                    </button>
                  </>
                ) : null}
                {singlePost.downloadfile ? (
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

            <div className="flex-column project_details ">
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

              {singlePost.description && (
                <>
                  {" "}
                  {singlePost.description && (
                    <>
                      <div className="project_tag tag">
                        <BlockContent blocks={singlePost.description} />
                      </div>
                    </>
                  )}
                </>
              )}

              {singlePost.external_links && (
                <>
                  {singlePost.external_links.length > 1 ? (
                    <h3>External links</h3>
                  ) : (
                    <h3>External link</h3>
                  )}

                  <div className="flex-row align-left">
                    {singlePost.external_links.map((link, index) => (
                      <a
                        href={link.external_link}
                        className="tag project_tag externalLink"
                        key={index}
                      >
                        {link.name}
                        {index + 1 < singlePost.external_links.length
                          ? ","
                          : null}
                      </a>
                    ))}
                  </div>
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
                </>
              ) : null}
            </div>
          </div>
        </div>
      </div>
      <div className="regContainer cover" ref={endOfProject}>
        {relatedPost && relatedPost.length !== 0 ? (
          <>
            <motion.h2 className="flex-column fullWidthPadded segmentHeadline">
              Related Projects
            </motion.h2>
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