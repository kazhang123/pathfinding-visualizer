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
        // <div
        //   className="endWrap"
        //   onMouseDown={() => this.props.onMouseDown(col, row)}
        //   onMouseEnter={() => this.props.onMouseEnter(col, row)}
        //   onMouseUp={() => this.props.onMouseUp()}
        // ></div>
        <svg
          width="1em"
          height="1em"
          viewBox="0 0 16 16"
          class="bi bi-asterisk mx-auto my-1 "
          style={{
            width: "24px",
            height: "23px",
            display: "block",
            cursor: "pointer",
            position: "absolute",
          }}
          fill="currentColor"
          xmlns="http://www.w3.org/2000/svg"
          onMouseDown={() => this.props.onMouseDown(col, row)}
          onMouseEnter={() => this.props.onMouseEnter(col, row)}
          onMouseUp={() => this.props.onMouseUp()}
        >
          <path
            fill-rule="evenodd"
            d="M8 0a1 1 0 0 1 1 1v5.268l4.562-2.634a1 1 0 1 1 1 1.732L10 8l4.562 2.634a1 1 0 1 1-1 1.732L9 9.732V15a1 1 0 1 1-2 0V9.732l-4.562 2.634a1 1 0 1 1-1-1.732L6 8 1.438 5.366a1 1 0 0 1 1-1.732L7 6.268V1a1 1 0 0 1 1-1z"
          />
        </svg>
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
