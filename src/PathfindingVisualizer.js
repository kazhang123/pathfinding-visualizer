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

    for (let x = 0; x < 35; x++) {
      const col = [];
      for (let y = 0; y < 15; y++) {
        const currNode = {
          x,
          y,
        };
        col.push(currNode);
      }
      nodes.push(col);
    }

    this.setState({ nodes });
  }

  render() {
    return (
      <React.Fragment>
        <div className="grid">
          {this.state.nodes.map((col) => {
            return (
              <div>
                {col.map((node) => (
                  <Node></Node>
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
