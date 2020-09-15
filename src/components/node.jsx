import React, { Component } from "react";
import "./node.css";

class Node extends Component {
  getClasses() {
    let classes = "node ";
    const {
      isStart,
      isEnd,
      isVisited,
      isWall,
      isPath,
      isAnimating,
    } = this.props.node;

    classes += isStart
      ? "start"
      : isEnd
      ? "end"
      : isWall
      ? "wall"
      : // : isVisited
        // ? "visited"
        // : isPath
        // ? "path"
        "";

    // if not currently animating nodes, keep nodes stagnant colours
    if (!isAnimating) {
      if (isPath) {
        classes = "path " + classes;
      } else if (isVisited) {
        classes = "visited " + classes;
      }
    }

    return classes;
  }

  render() {
    const { col, row, isStart, isEnd } = this.props.node;

    // if node is start/end, render specific symbol on top of the node
    let startEndNode;

    if (isStart) {
      startEndNode = (
        <div
          className="startWrap"
          onMouseDown={() => this.props.onMouseDown(col, row)}
          onMouseEnter={() => this.props.onMouseEnter(col, row)}
          onMouseUp={() => this.props.onMouseUp()}
        ></div>
      );
    } else if (isEnd) {
      startEndNode = (
        <div
          className="endWrap"
          onMouseDown={() => this.props.onMouseDown(col, row)}
          onMouseEnter={() => this.props.onMouseEnter(col, row)}
          onMouseUp={() => this.props.onMouseUp()}
        ></div>
      );
    }

    return (
      <div className="wrap">
        {startEndNode}
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
