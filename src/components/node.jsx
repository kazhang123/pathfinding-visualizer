import React, { Component } from "react";
import "./node.css";

class Node extends Component {
  getClasses() {
    let classes = "node ";
    const { isStart, isEnd, isVisited, isWall } = this.props.node;
    classes += isStart
      ? "start"
      : isEnd
      ? "end"
      : isVisited
      ? "visited"
      : isWall
      ? "wall"
      : "";
    return classes;
  }

  state = {};
  render() {
    return <div className={this.getClasses()}></div>;
  }
}

export default Node;
