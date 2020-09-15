import React, { Component } from "react";
import "./legend.css";

class Legend extends Component {
  render() {
    return (
      <div className="legend">
        <span className="legend-item block black"></span>
        <span className="legend-item">Wall</span>
        <span className="legend-item block green"></span>
        <span className="legend-item">Visited node</span>
        <span className="legend-item block yellow"></span>
        <span className="legend-item">Path</span>
        <span>
          <span id="startSymbol" className="legend-item"></span>
          <span className="legend-item">Start node</span>
        </span>
        <span>
          <svg
            width="2em"
            height="2em"
            viewBox="0 0 16 16"
            class="bi bi-asterisk ml-2"
            fill="currentColor"
            xmlns="http://www.w3.org/2000/svg"
            style={{ width: "26px", height: "26px" }}
          >
            <path
              fill-rule="evenodd"
              d="M8 0a1 1 0 0 1 1 1v5.268l4.562-2.634a1 1 0 1 1 1 1.732L10 8l4.562 2.634a1 1 0 1 1-1 1.732L9 9.732V15a1 1 0 1 1-2 0V9.732l-4.562 2.634a1 1 0 1 1-1-1.732L6 8 1.438 5.366a1 1 0 0 1 1-1.732L7 6.268V1a1 1 0 0 1 1-1z"
            />
          </svg>
          <span className="legend-item">End node</span>
        </span>

        <span className="legend-item time">
          <svg
            width="1em"
            height="1em"
            viewBox="0 0 16 16"
            class="bi bi-clock m-2"
            fill="currentColor"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              d="M8 15A7 7 0 1 0 8 1a7 7 0 0 0 0 14zm8-7A8 8 0 1 1 0 8a8 8 0 0 1 16 0z"
            />
            <path
              fill-rule="evenodd"
              d="M7.5 3a.5.5 0 0 1 .5.5v5.21l3.248 1.856a.5.5 0 0 1-.496.868l-3.5-2A.5.5 0 0 1 7 9V3.5a.5.5 0 0 1 .5-.5z"
            />
          </svg>
          <span
            className="legend-item time"
            key={this.props.legend.timeTaken}
          >{`${this.props.legend.timeTaken} ms to find path`}</span>
        </span>
      </div>
    );
  }
}

export default Legend;
