import Helmet from "react-helmet";
import React from "react";

export const HeadTags = (props) => {
  return (
    <Helmet>
      <title>{props.title}</title>
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
      <meta name="description" key="description" content={props.description} />
      <meta name="title" key="title" content={props.title} />
      <meta property="og:title" key="og:title" content={props.title} />
      <meta property="og:locale" key="og:locale" content="en_US" />
      <meta charSet="utf-8" />
      <meta property="og:type" key="og:type" content="website" />
      <meta
        property="og:description"
        key="og:description"
        content={props.description}
      />
      <meta property="og:title" content={props.title} />
      <meta property="og:url" content="" />
      <meta property="og:description" content={props.description} />
      <meta property="twitter:title" content={props.title} />
      <meta property="twitter:description" content={props.description} />

      <meta property="twitter:card" content="" />
    </Helmet>
  );
};
