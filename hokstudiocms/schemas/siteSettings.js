/* eslint-disable import/no-anonymous-default-export */

export default {
  name: "siteSettings",
  title: "Site Settings",
  type: "document",
  fields: [
    {
      name: "title",
      title: "Site Title",
      type: "string",
    },
    {
      name: "mainImage",
      title: "Main image",
      type: "image",
      options: {
        hotspot: true,
      },
    },
    {
      name: "logo",
      title: "Logo",
      type: "image",
    },
    {
      name: "contact",
      title: "Contact",
      type: "blockContent",
    },
    {
      name: "about",
      title: "About Me",
      type: "blockContent",
    },

    {
      name: "body",
      title: "Body",
      type: "blockContent",
    },
  ],
};
