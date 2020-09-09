import React, { Component } from "react";
import "./legend.css";

class Legend extends Component {
  state = {};
  render() {
    return (
      <div className="legend">
        <svg
          width="1em"
          height="1em"
          viewBox="0 0 16 16"
          class="bi bi-clock"
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
        <span className="legend-item">{`${this.props.legend.timeTaken} s`}</span>
        <span className="legend-item block blue"></span>
        <span className="legend-item">Visited nodes</span>
        <span className="legend-item block yellow"></span>
        <span className="legend-item">Path</span>
        <span className="legend-item block green"></span>
        <span className="legend-item">Start node</span>
        <span className="legend-item block red"></span>
        <span className="legend-item">End node</span>
      </div>
    );
  }
}

export default Legend;
