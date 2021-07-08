import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import sanityClient from "../client";

import imageUrlBuilder from "@sanity/image-url";

// Get a pre-configured url-builder from your sanity client
const builder = imageUrlBuilder(sanityClient);

// Then we like to make a simple function like this that gives the
// builder an image and returns the builder for you to specify additional
// parameters:
function urlFor(source) {
  return builder.image(source);
}

export default function Projects() {
  const [allPosts, setAllPosts] = useState(null);

  const [sortedPosts, setSortedPosts] = useState(null);

  const [tags, setTags] = useState([]);

  const [currentTags, setCurrentTags] = useState([]);

  useEffect(() => {
    sanityClient
      .fetch(
        '*[_type == "project"]{title,slug,mainImage{asset->{_id,url}, hotspot, alt},imagesGallery, tags}'
      )
      .then((data) => {
        setAllPosts(data);
        setSortedPosts(data);
        var tags = [];
        for (let index = 0; index < data.length; index++) {
          const post = data[index];
          console.log(post.mainImage);
          post.value = 0;
          if (post.tags != null && Array.isArray(post.tags)) {
            for (let index = 0; index < post.tags.length; index++) {
              const tag = post.tags[index];
              tags.push(tag);
            }
          }
        }

        let sortedTags = [...new Set(tags)];
        setTags(sortedTags);
      })
      .catch(console.error);
  }, []);

  useEffect(() => {
    if (currentTags.length > 0) {
      const tempSortedPosts = [];

      ///loop through all posts
      for (let index = 0; index < allPosts.length; index++) {
        const post = allPosts[index];
        let post_score = 0;

        ///check the posts tags
        for (let index = 0; index < post.tags.length; index++) {
          const tag = post.tags[index];

          ///compare post tags to currentTags
          if (currentTags.includes(tag)) {
            //set post_score depending on how many currentTags the post is matching
            post_score = post_score + 1;
          }
        }
        if (post_score > 0) {
          post.value = post_score;
          tempSortedPosts.push(post);
        }
      }
      tempSortedPosts.sort((a, b) => b.value - a.value);

      console.log("SORTED", tempSortedPosts);

      setSortedPosts(tempSortedPosts);
    } else {
      setSortedPosts(allPosts);
    }
  }, [currentTags, allPosts]);

  function setTag(tag) {
    if (!currentTags.includes(tag.tag)) {
      const tempTags = [...currentTags];
      tempTags.push(tag.tag);
      setCurrentTags(tempTags);
      document.getElementById("tag_" + tag.tag).classList.add("active");
    } else if (currentTags.includes(tag.tag)) {
      var tagIndex = currentTags.indexOf(tag.tag);
      currentTags.splice(tagIndex, 1);
      const tempTags = [...currentTags];
      document.getElementById("tag_" + tag.tag).classList.remove("active");

      setCurrentTags(tempTags);
    }
  }

  return (
    <>
      <div className="tag_grid">
        {tags.map((tag, index) => (
          <button
            className="tag_button"
            key={index}
            id={"tag_" + tag + ""}
            onClick={() => {
              setTag({ tag });
            }}
          >
            {" "}
            {tag}{" "}
          </button>
        ))}
      </div>
      <section className="post_grid">
        {sortedPosts &&
          sortedPosts.map((post, index) => (
            <article key={post.slug.current} className="post_card">
              <Link
                to={"/" + post.slug.current}
                key={post.slug.current}
                className="w-full teaser-link"
              >
                <div className="details">
                  <h3>{post.title}</h3>
                  {post.tags.map((tag, index) => (
                    <button
                      className="tag_button"
                      key={index}
                      id={"tag_" + tag + ""}
                      onClick={() => {
                        setTag({ tag });
                      }}
                    >
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
            </article>
          ))}
      </section>
    </>
  );
}
