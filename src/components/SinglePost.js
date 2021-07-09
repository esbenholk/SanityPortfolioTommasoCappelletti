import React, { useState, useEffect } from "react";
import sanityClient from "../client";
import { useParams } from "react-router-dom";
import BlockContent from "@sanity/block-content-to-react";
import PostCard from "./blocks/postCard.js";

import imageUrlBuilder from "@sanity/image-url";

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
            title,
            _id,
            slug,
            mainImage{asset->{_id,url}, hotspot, alt},
            imagesGallery, 
            tags,
            body
        }`
      )
      .then((data) => {
        setSinglePost(data[0]);
        console.log("get single post", data[0]);

        sanityClient
          .fetch(
            `*[_type == "project"]{title,slug,mainImage{asset->{_id,url}, hotspot, alt}, tags}`
          )
          .then((relatedData) => {
            const relatedProjects = [];
            for (let index = 0; index < relatedData.length; index++) {
              const post = relatedData[index];
              if (post.tags.some((r) => data[0].tags.includes(r))) {
                relatedProjects.push(post);
                console.log("shares tags", post);
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
    <main>
      <article>
        {singlePost.mainImage.hotspot ? (
          <img
            src={urlFor(singlePost.mainImage.asset.url)}
            alt={singlePost.mainImage.alt}
            style={{
              objectPosition: `${singlePost.mainImage.hotspot.x * 100}% ${
                singlePost.mainImage.hotspot.y * 100
              }%`,
            }}
          />
        ) : (
          <img
            src={urlFor(singlePost.mainImage.asset.url)}
            alt={singlePost.mainImage.alt}
          />
        )}
        <header>
          <h1>{singlePost.title}</h1>
        </header>
        {singlePost.body && (
          <BlockContent
            blocks={singlePost.body}
            projectId="swdt1dj3"
            dataset="production"
          />
        )}
      </article>

      <div layout className="post_grid">
        {relatedPost &&
          relatedPost.map((post, index) => (
            <PostCard post={post} key={index} />
          ))}
      </div>
    </main>
  );
}
