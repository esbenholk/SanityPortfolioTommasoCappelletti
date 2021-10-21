import React from "react";

export default function Basket({ basket }) {
  //   const myContext = useContext(AppContext);

  console.log("in basket", basket);

  return (
    <div className="basket">
      <img
        className="social_media_icon header-object basketIcon"
        src="\assets\awesome-shopping-cart.png"
        alt="shopping cart"
      />

      {basket && basket.length > 0 ? (
        <div className="basketCounter">
          <p>{basket.length}</p>{" "}
        </div>
      ) : null}
    </div>
  );
}
