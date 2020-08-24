import React, { Component } from "react";
import "./node.css";

class Node extends Component {
  getClasses() {
    let classes = "node ";
    const { isStart, isEnd, isVisited, isWall, isPath } = this.props.node;
    classes += isStart
      ? "start"
      : isEnd
      ? "end"
      : isVisited
      ? "visited"
      : isWall
      ? "wall"
      : isPath
      ? "path"
      : "";
    return classes;
  }

  state = {};
  render() {
    const { col, row } = this.props.node;
    return (
      <div className="wrap">
        <div
          onMouseDown={() => this.props.onMouseDown(col, row)}
          onMouseEnter={() => this.props.onMouseEnter(col, row)}
          onMouseUp={() => this.props.onMouseUp()}
          className={this.getClasses()}
          id={`node ${col} ${row}`}
        ></div>
      </div>
    );
  }
}

export default Node;
