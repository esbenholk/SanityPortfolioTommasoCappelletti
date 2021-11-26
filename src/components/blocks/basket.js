import React, { useState, useContext } from "react";

import AppContext from "../../globalState";

import BasketCard from "./basketCard";

export default function Basket({ basket }) {
  const myContext = useContext(AppContext);
  const projectList = myContext.projectList;
  const info = myContext.siteSettings;

  const [isOpen, setIsOpen] = useState();

  const EmptyCart = (mail) => {
    return (
      <>
        <h2>Your cart is empty.</h2>
        <p>
          If your want to contact me without project references{" "}
          <a href={"mailto:" + mail}>Send email now</a>
        </p>
      </>
    );
  };

  const FullCart = (props) => {
    return (
      <>
        <h2>Something catches your eye! Wanna drop a line?</h2>
      </>
    );
  };

  function openMenu() {
    if (isOpen === true) {
      setIsOpen(false);
    } else {
      setIsOpen(true);
    }
  }

  function removeFromCart(project) {
    var newBasket = basket;
    for (let index = 0; index < basket.length; index++) {
      const basketproject = basket[index];
      if (basketproject.title === project.title) {
        newBasket.splice(index, 1);
        myContext.setBasket(newBasket);
      }
    }
  }
  return (
    <>
      <div className="basket" onClick={openMenu}>
        <img
          className="header-object basketIcon"
          src="\assets\awesome-shopping-cart.png"
          alt="shopping cart"
        />

        {basket && basket.length > 0 ? (
          <div className="basketCounter">
            <p>{basket.length}</p>{" "}
          </div>
        ) : null}
      </div>

      <div>
        <div
          className={isOpen ? "overlay active" : "overlay"}
          onClick={openMenu}
        ></div>
        <div className={isOpen ? "foldout active" : "foldout"}>
          <div className="foldoutmenu">
            <div className="foldoutHeader foldoutDiv">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 33"
              >
                <g
                  id="Group_137"
                  data-name="Group 137"
                  transform="translate(-838.988 -94)"
                >
                  <path
                    onClick={openMenu}
                    id="Icon_ionic-md-close"
                    data-name="Icon ionic-md-close"
                    d="M28.477,9.619l-2.1-2.1L18,15.9,9.619,7.523l-2.1,2.1L15.9,18,7.523,26.381l2.1,2.1L18,20.1l8.381,8.381,2.1-2.1L20.1,18Z"
                    transform="translate(832.172 93.5)"
                    stroke="white"
                    strokeWidth="5"
                  />
                </g>
              </svg>
              {basket.length === 0 ? (
                <EmptyCart email={info.email} />
              ) : (
                <FullCart />
              )}
            </div>
            <div className="foldoutDiv">
              {basket.length === 0 ? (
                <>
                  {" "}
                  <h2>Others have looked at</h2>
                  {projectList ? (
                    <div className="flex-column">
                      {projectList.map((post, index) => (
                        <BasketCard
                          post={post}
                          key={index}
                          openMenu={openMenu}
                        />
                      ))}
                    </div>
                  ) : null}
                </>
              ) : (
                <>
                  {" "}
                  <h2>Your cart</h2>
                  {basket ? (
                    <div className="flex-column">
                      {basket.map((post, index) => (
                        <BasketCard
                          post={post}
                          key={index}
                          isInCart={true}
                          removeFromCart={removeFromCart}
                          openMenu={openMenu}
                        />
                      ))}
                    </div>
                  ) : null}
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
