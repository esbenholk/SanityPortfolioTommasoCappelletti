import { Carousel } from "react-responsive-carousel";

import "react-responsive-carousel/lib/styles/carousel.min.css";

export default function CustomCarousel({ children }) {
  return (
    <Carousel
      swipeable={true}
      swipeScrollTolerance={20}
      stopOnHover={true}
      showIndicators={true}
      emulateTouch={true}
      showStatus={false}
      showThumbs={false}
      autoPlay={false}
      className="featured_post_container"
      renderArrowPrev={(clickHandler, hasPrev, labelPrev) =>
        hasPrev && (
          <button
            onClick={clickHandler}
            className="featuredCardArrow prevArrow"
          >
            <img
              style={{ height: "30px", width: "30px" }}
              src={`assets/Arrowright.svg`}
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
              style={{ height: "30px", width: "30px" }}
              src={`assets/Arrowright.svg`}
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
