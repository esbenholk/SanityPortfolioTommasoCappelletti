import React from "react";

class DropDownMenu extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isOpen: false,
    };
  }

  render() {
    console.log(this.props);
    const { isOpen } = this.state;

    return (
      <div
        className={isOpen ? "dropdown active" : "dropdown"}
        onClick={this.handleClick}
      >
        <div className="dropdown__text">
          {!isOpen ? (
            <div className="flex-row no-wrap">
              <img
                src="/assets/SearchIcon.svg"
                alt="search icon"
                style={{ height: "24px" }}
              ></img>
              <p style={{ paddingLeft: "40px" }}>Looking for a designer?</p>
            </div>
          ) : (
            <div className="flex-row no-wrap">
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
                    id="Icon_ionic-md-close"
                    data-name="Icon ionic-md-close"
                    d="M28.477,9.619l-2.1-2.1L18,15.9,9.619,7.523l-2.1,2.1L15.9,18,7.523,26.381l2.1,2.1L18,20.1l8.381,8.381,2.1-2.1L20.1,18Z"
                    transform="translate(832.172 93.5)"
                    stroke="#000"
                    strokeWidth="1"
                  />
                </g>
              </svg>
              <p style={{ paddingLeft: "40px" }}>
                {" "}
                Which skill are you looking for?
              </p>
            </div>
          )}
        </div>
        {this.itemList(this.props.categories)}
      </div>
    );
  }

  handleClick = () => {
    this.setState({
      isOpen: !this.state.isOpen,
    });
  };

  handleText = (ev) => {
    this.setState({
      haveText: ev.currentTarget.textContent,
    });
  };

  itemList = (props) => {
    const list = props.map((item) => (
      <div className="dropdown__item" key={item.toString()}>
        <a key={item.toString()} href={item}>
          {item}
        </a>
      </div>
    ));

    return <div className="dropdown__items"> {list} </div>;
  };
}

export default DropDownMenu;
