import React from "react";

import Image from "./image";

import ReactPlayer from "react-player";

export default class VideoPlayer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      video: props.video,
      display: "none",
      showThumb: props.showThumb,
      shouldPlay: props.playing,
    };
  }

  removeThumbnail() {
    this.setState({ display: "block" });
  }
  componentDidUpdate() {
    console.log("videplayer updates", this.props.playing, this.shouldPlay);
  }
  componentDidMount() {
    console.log("videplayer mounts", this.props.playing, this.shouldPlay);
  }

  render() {
    return (
      <>
        {this.state.video.thumbnail && this.state.showThumb ? (
          <div
            style={{ cursor: "pointer" }}
            onClick={(e) => {
              e.preventDefault();
              this.removeThumbnail();
            }}
          >
            <Image image={this.state.video.thumbnail} />
          </div>
        ) : (
          <ReactPlayer
            width="100%"
            height="100%"
            url={`https://www.youtube.com/embed/${this.state.video.embedID}`}
            playing={this.props.playing}
          />
        )}
      </>
    );
  }
}
