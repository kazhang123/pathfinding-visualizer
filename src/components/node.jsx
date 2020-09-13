import React, { Component } from "react";
import "./node.css";

class Node extends Component {
  /**
   * Cannot call setState every 15 ms to re-render entire grid
   * Since the "visited" class and css is being added manually instead of setState,
   *
   *
   */

  // componentDidMount() {
  //   if (this.props.isAnimating) {
  //     setTimeout(() => {}, 10000);
  //   }
  // }

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

    // setTimeout(() => {
    // setTimeout(() => {
    //   if (isAnimating) {
    //   }
    // }, 10000);

    // setTimeout(() => {
    // if not currently animating nodes, keep nodes stagnant colours
    if (!isAnimating) {
      if (isPath) {
        // classes = classes + " path";
        classes = "path " + classes;
      } else if (isVisited) {
        // classes = classes + " visited";
        classes = "visited " + classes;
      }
      // classes += isVisited ? "visited" : isPath ? "path" : "";
    }
    // }, 2300);

    // }, 2300);

    return classes;
  }

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
