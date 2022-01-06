import React from "react";

class Loader extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    return (
      <>
        <div className="cell">
          <div className="circle gelatine"></div>
        </div>
      </>
    );
  }
}

export default Loader;
