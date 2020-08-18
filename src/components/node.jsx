import React, { Component } from "react";
import "./node.css";

class Node extends Component {
  getClasses() {
    let classes = "node ";
    const { isStart, isEnd } = this.props.node;
    classes += isStart ? "start" : isEnd ? "end" : "";
    return classes;
  }

  state = {};
  render() {
    return <div className={this.getClasses()}></div>;
  }
}

export default Node;
