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
      url: props.video.embedID,
    };
  }

  removeThumbnail() {
    this.setState({ display: "block" });
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
            url={this.state.url}
            playing={this.props.isPlaying}
            controls
            playsinline
            config={{
              youtube: {
                playerVars: { modestbranding: 1 },
              },
              file: {
                attributes: {
                  controlsList: "nofullscreen",
                },
              },
            }}
          />
        )}
      </>
    );
  }
}
