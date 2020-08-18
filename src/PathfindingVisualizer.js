import React, { Component } from "react";
import NavBar from "./components/navbar";
import Node from "./components/node.jsx";
import "./PathfindingVisualizer.css";

class PathfindingVisualizer extends Component {
  state = {
    nodes: [],
  };

  componentDidMount() {
    const nodes = [];

    for (let col = 0; col < 35; col++) {
      const currCol = [];
      for (let row = 0; row < 15; row++) {
        const currNode = {
          col,
          row,
          isStart: col === 5 && row === 7,
          isEnd: col === 29 && row === 7,
          isVisited: false,
          isWall: false,
        };
        currCol.push(currNode);
      }
      nodes.push(currCol);
    }

    this.setState({ nodes });
  }

  render() {
    return (
      <React.Fragment>
        <div className="grid">
          {this.state.nodes.map((col, colIdx) => {
            return (
              <div key={colIdx}>
                {col.map((node, rowIdx) => (
                  <Node key={rowIdx} node={node} />
                ))}
              </div>
            );
          })}
        </div>
      </React.Fragment>
    );
  }
}

export default PathfindingVisualizer;
