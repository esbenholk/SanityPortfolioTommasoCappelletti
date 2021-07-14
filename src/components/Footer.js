import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";

export default function Footer({ info, projectList }) {
  const [tags, setTags] = useState([]);

  const [categories, setCategories] = useState([]);

  useEffect(() => {
    var tags = [];
    var categories = [];
    if (projectList) {
      for (let index = 0; index < projectList.length; index++) {
        const post = projectList[index];

        if (post.tags != null && Array.isArray(post.tags)) {
          for (let index = 0; index < post.tags.length; index++) {
            const tag = post.tags[index];
            tags.push(tag);
          }
        }
        if (post.categories != null && Array.isArray(post.categories)) {
          for (let index = 0; index < post.categories.length; index++) {
            const category = post.categories[index];
            categories.push(category.title);
          }
        }
      }

      let sortedTags = [...new Set(tags)];
      setTags(sortedTags);

      let sortedCategories = [...new Set(categories)];
      setCategories(sortedCategories);
    }
  }, [projectList]);

  return (
    <footer>
      <div className="flex-row to-column">
        <div className="flex-column footer_link_column">
          <NavLink to="/">
            {info.logo && (
              <img className="logo" src={info.logo.asset.url} alt="" />
            )}
          </NavLink>
        </div>

        <div className="flex-column footer_link_column">
          <p>This is us</p>
          <NavLink to="/projects">Projects</NavLink>
          <NavLink to="/about">About us</NavLink>
          <NavLink to="/onsale">On Sale</NavLink>
        </div>

        <div className="flex-column footer_link_column">
          <p>Things that we like</p>
          {tags &&
            tags.map((tag, index) => (
              <p className="tag_button" key={index} id={"tag_" + tag + ""}>
                {" "}
                {tag}{" "}
              </p>
            ))}
        </div>
        <div className="flex-column footer_link_column">
          <p>Things that we do</p>
          {categories &&
            categories.map((category, index) => (
              <a
                href={category}
                className="tag_button"
                key={index}
                id={"category_" + category + index}
              >
                {" "}
                {category}{" "}
              </a>
            ))}
        </div>
      </div>

      <div className="flex-row">
        {info.socialMediaHandles &&
          info.socialMediaHandles.map((handle, index) => (
            <a
              href={handle.url}
              className="tag_button"
              key={index}
              id={"category_" + handle.url + ""}
            >
              <img
                className="social_media_icon"
                src={handle.logo.asset.url}
                alt=""
              />
            </a>
          ))}
      </div>
    </footer>
  );
}
