import FoldOutMenu from "./foldOutMenu";
import React, { useState, useContext } from "react";

import AppContext from "../../globalState";

export default function Basket({ basket }) {
  const myContext = useContext(AppContext);
  const projectList = myContext.projectList;
  const info = myContext.siteSettings;

  const [isOpen, setIsOpen] = useState(false);
  function openMenu() {
    setIsOpen(!isOpen);
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
        <FoldOutMenu
          openMenu={openMenu}
          isOpen={isOpen}
          basket={basket}
          projectList={projectList}
          info={info}
          removeFromCart={removeFromCart}
        />
      </div>
    </>
  );
}
