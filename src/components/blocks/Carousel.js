import React, { useEffect, useState } from "react";

import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

export default function CustomCarousel({
  children,
  arrows,
  classsss,
  autoplay,
  currentIndex,
  stopVideo,
}) {
  let [swipeable, setSwipeable] = useState(true);

  if (!autoplay) {
    autoplay = false;
  }
  if (!currentIndex) {
    currentIndex = 0;
  }

  useEffect(() => {
    if (children.length) {
      function disableScroll() {
        let carousel = document.querySelector(".carousel");
        console.log(carousel);

        let startPos;
        let endPos;
        let isScrolling = 1;

        function touchMove(e) {
          if (
            e.targetTouches.length > 1 ||
            (e.scale && e.scale !== 1) ||
            !startPos
          )
            return;

          var touch = e.targetTouches[0];

          endPos = {
            x: touch.pageX - startPos.x,
            y: touch.pageY - startPos.y,
          };
          isScrolling = Math.abs(endPos.x) <= Math.abs(endPos.y) ? 1 : 0; //When isScrolling is 1, it means vertical sliding and 0 is horizontal sliding
          if (isScrolling && swipeable) {
            setSwipeable(false);
          }
        }

        function touchEnd() {
          setSwipeable(true);
          carousel.removeEventListener("touchmove", touchMove);
        }

        function touchStart(e) {
          var touch = e.targetTouches[0]; //The touches array object gets all the touches on the screen, taking the first touch
          startPos = {
            x: touch.pageX,
            y: touch.pageY,
          };

          carousel.addEventListener("touchmove", touchMove);
        }

        carousel.addEventListener("touchstart", touchStart);
        carousel.addEventListener("touchend", touchEnd);
      }

      disableScroll();
    }
  }, [children, swipeable]);

  return (
    <Carousel
      swipeable={!autoplay}
      axis={"horizontal"}
      swipeScrollTolerance={30}
      stopOnHover={true}
      showIndicators={true}
      emulateTouch={true}
      showStatus={false}
      interval={6000}
      showThumbs={false}
      autoPlay={autoplay}
      showArrows={arrows}
      className={`carousel "${classsss}"`}
      infiniteLoop={false}
      selectedItem={currentIndex}
      onChange={(e) => {
        if (stopVideo) {
          stopVideo();
        }
      }}
      renderArrowPrev={(clickHandler, hasPrev, labelPrev) =>
        hasPrev && (
          <button
            onClick={(e) => {
              clickHandler();
              if (stopVideo) {
                stopVideo();
              }
            }}
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
            // onClick={clickHandler}
            className="featuredCardArrow nextArrow"
            onClick={(e) => {
              clickHandler();
              if (stopVideo) {
                stopVideo();
              }
            }}
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
