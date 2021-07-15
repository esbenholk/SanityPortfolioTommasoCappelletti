import { Carousel } from "react-responsive-carousel";

import "react-responsive-carousel/lib/styles/carousel.min.css";

export default function CustomCarousel({ children }) {
  return (
    <Carousel
      swipeable={true}
      swipeScrollTolerance={20}
      stopOnHover={true}
      showIndicators={false}
      emulateTouch={true}
      showStatus={false}
      showThumbs={false}
      autoPlay={false}
      className="featured_post_container"
    >
      {children}
    </Carousel>
  );
}
