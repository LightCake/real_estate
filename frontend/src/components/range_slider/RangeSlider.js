import React from "react";
import { Slider, Rail, Handles, Tracks, Ticks } from "react-compound-slider";
import "./RangeSlider.css";

function Handle({
  // your handle component
  handle: { id, value, percent },
  getHandleProps
}) {
  return (
    <div
      style={{
        left: `${percent}%`,
        position: "absolute",
        marginLeft: -8,
        marginTop: 30,
        zIndex: 2,
        width: 15,
        height: 15,
        border: 0,
        textAlign: "center",
        cursor: "pointer",
        borderRadius: "50%",
        backgroundColor: "black",
        color: "#333"
      }}
      {...getHandleProps(id)}
    >
      <div style={{ marginLeft: -2, fontSize: 11, marginTop: -20 }}>
        {value}
      </div>
    </div>
  );
}

function Track({ source, target, getTrackProps }) {
  // your own track component
  return (
    <div
      style={{
        position: "absolute",
        height: 5,
        zIndex: 1,
        marginTop: 35,
        backgroundColor: "black",
        borderRadius: 5,
        cursor: "pointer",
        left: `${source.percent}%`,
        width: `${target.percent - source.percent}%`
      }}
      {...getTrackProps()} // this will set up events if you want it to be clickeable (optional)
    />
  );
}

function Tick({ tick, count }) {
  // your own tick component
  return (
    <div>
      <div
        style={{
          position: "absolute",
          marginTop: 52,
          marginLeft: -0.5,
          width: 1,
          height: 8,
          backgroundColor: "silver",
          left: `${tick.percent}%`
        }}
      />
      <div
        style={{
          position: "absolute",
          marginTop: 60,
          fontSize: 10,
          textAlign: "center",
          marginLeft: `${-(100 / count) / 2}%`,
          width: `${100 / count}%`,
          left: `${tick.percent}%`
        }}
      >
        {tick.value}
      </div>
    </div>
  );
}

class RangeSlider extends React.Component {
  render() {
    const sliderStyle = {
      // Give the slider some width
      position: "relative",
      width: "100%",
      height: 80
    };

    const railStyle = {
      position: "absolute",
      width: "100%",
      height: 5,
      marginTop: 35,
      borderRadius: 5,
      backgroundColor: "grey"
    };

    return (
      <div className="range_slider">
        <Slider
          rootStyle={sliderStyle}
          step={this.props.step}
          mode={2}
          domain={this.props.range}
          values={this.props.range}
          onUpdate={this.props.onUpdate}
          onChange={this.props.onChange}
        >
          <Rail>
            {(
              { getRailProps } // adding the rail props sets up events on the rail
            ) => <div style={railStyle} {...getRailProps()} />}
          </Rail>
          <Handles>
            {({ handles, getHandleProps }) => (
              <div className="slider-handles">
                {handles.map(handle => (
                  <Handle
                    key={handle.id}
                    handle={handle}
                    getHandleProps={getHandleProps}
                  />
                ))}
              </div>
            )}
          </Handles>
          <Tracks left={false} right={false}>
            {({ tracks, getTrackProps }) => (
              <div className="slider-tracks">
                {tracks.map(({ id, source, target }) => (
                  <Track
                    key={id}
                    source={source}
                    target={target}
                    getTrackProps={getTrackProps}
                  />
                ))}
              </div>
            )}
          </Tracks>
          <Ticks count={this.props.ticks}>
            {({ ticks }) => (
              <div className="slider-ticks">
                {ticks.map(tick => (
                  <Tick key={tick.id} tick={tick} count={ticks.length} />
                ))}
              </div>
            )}
          </Ticks>
        </Slider>
      </div>
    );
  }
}

export default RangeSlider;
