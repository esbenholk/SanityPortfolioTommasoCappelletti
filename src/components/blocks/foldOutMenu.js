import React from "react";
import BasketCard from "./basketCard";

const EmptyCart = (props) => {
  return (
    <>
      <h2>Your cart is empty.</h2>
      <p>
        If your want to contact me without project references{" "}
        <a href={"mailto:" + props.email}>Send email now</a>
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

class FoldOutMenu extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      projectList: [],
      isOpen: this.props.isOpen,
    };
  }
  componentDidMount() {
    console.log("foldoutmenu mounts");
  }

  componentDidUpdate() {
    console.log("foldoutmenu updates");
  }
  handleClick = () => {
    this.setState({
      isOpen: !this.state.isOpen,
    });
  };

  render() {
    var projectList;
    if (this.props.projectList) {
      projectList = [this.props.projectList[0], this.props.projectList[1]];
    }
    return (
      <div>
        <div
          className={this.state.isOpen ? "overlay active" : "overlay"}
          // onClick={this.props.openMenu}
        ></div>
        <div className={this.state.isOpen ? "foldout active" : "foldout"}>
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
                    // onClick={this.props.openMenu}
                    id="Icon_ionic-md-close"
                    data-name="Icon ionic-md-close"
                    d="M28.477,9.619l-2.1-2.1L18,15.9,9.619,7.523l-2.1,2.1L15.9,18,7.523,26.381l2.1,2.1L18,20.1l8.381,8.381,2.1-2.1L20.1,18Z"
                    transform="translate(832.172 93.5)"
                    stroke="white"
                    strokeWidth="5"
                  />
                </g>
              </svg>
              {this.props.basket.length === 0 ? (
                <EmptyCart email={this.props.info.email} />
              ) : (
                <FullCart />
              )}
            </div>
            <div className="foldoutDiv">
              {this.props.basket.length === 0 ? (
                <>
                  {" "}
                  <h2>Others have looked at</h2>
                  {projectList ? (
                    <div className="flex-column">
                      {projectList.map((post, index) => (
                        <BasketCard post={post} key={index} />
                      ))}
                    </div>
                  ) : null}
                </>
              ) : (
                <>
                  {" "}
                  <h2>Your cart</h2>
                  {this.props.basket ? (
                    <div className="flex-column">
                      {this.props.basket.map((post, index) => (
                        <BasketCard
                          post={post}
                          key={index}
                          isInCart={true}
                          removeFromCart={this.props.removeFromCart}
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
    );
  }
}

export default FoldOutMenu;

{
  /* <FoldOutMenu
          openMenu={openMenu}
          isOpen={isOpen}
          basket={basket}
          projectList={projectList}
          info={info}
          removeFromCart={removeFromCart}
        /> */
}
