import React from "react";

import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

export default function CustomCarousel({
  children,
  arrows,
  classsss,
  autoplay,
}) {
  if (!autoplay) {
    autoplay = false;
  }
  return (
    <Carousel
      swipeable={true}
      swipeScrollTolerance={20}
      stopOnHover={true}
      showIndicators={true}
      emulateTouch={true}
      showStatus={false}
      showThumbs={false}
      autoPlay={autoplay}
      showArrows={arrows}
      className={classsss}
      renderArrowPrev={(clickHandler, hasPrev, labelPrev) =>
        hasPrev && (
          <button
            onClick={clickHandler}
            className="featuredCardArrow prevArrow"
          >
            <img
              style={{
                height: "55px",
                width: "55px",
                transform: "rotate(180deg)",
              }}
              src={`../assets/arrow_in_circle.svg`}
              alt="prevArrow"
            />
          </button>
        )
      }
      renderArrowNext={(clickHandler, hasNext, labelNext) =>
        hasNext && (
          <button
            onClick={clickHandler}
            className="featuredCardArrow nextArrow"
          >
            <img
              style={{ height: "55px", width: "55px" }}
              src={`../assets/arrow_in_circle.svg`}
              alt="nextArrow"
            />
          </button>
        )
      }
    >
      {children}
    </Carousel>
  );
}
