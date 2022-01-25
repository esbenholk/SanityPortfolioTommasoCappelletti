import BaseBlockContent from "@sanity/block-content-to-react";
import React from "react";
import Image from "./image";

const serializers = {
  types: {
    block(props) {
      switch (props.node.style) {
        case "h1":
          return <h1>{props.children}</h1>;
        case "h2":
          return <h2>{props.children}</h2>;
        case "h3":
          return <h3>{props.children}</h3>;

        // ...

        default:
          return <p>{props.children}</p>;
      }
    },
  },
  marks: {
    inlineicon(props) {
      // switch (props.mark._type) {
      //   case "inlineicon":
      //     if (props.mark.asset) {
      //       return (
      //         <Image src={props.mark.asset.url || ""} alt={props.children[0]} />
      //       );
      //     } else {
      //       return null;
      //     }
      // }
      return <Image src={props.mark.asset.url || ""} alt={props.children[0]} />;
    },
  },
};

const BlockContent = ({ blocks }) => (
  <BaseBlockContent
    blocks={blocks}
    serializers={serializers}
    projectId="2748ynqv"
    dataset="production"
  />
);

export default BlockContent;
