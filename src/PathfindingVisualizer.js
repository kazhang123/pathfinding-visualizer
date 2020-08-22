import React, { Component } from "react";
import NavBar from "./components/navbar";
import Node from "./components/node.jsx";
import "./PathfindingVisualizer.css";
import { dijkstras } from "./algorithms/dijkstras";

const START_NODE_X = 5;
const START_NODE_Y = 7;
const END_NODE_X = 29;
const END_NODE_Y = 7;
const NUM_COLS = 35;
const NUM_ROWS = 15;

class PathfindingVisualizer extends Component {
  state = {
    nodes: [],
  };

  componentDidMount() {
    const nodes = [];

    for (let col = 0; col < NUM_COLS; col++) {
      const currCol = [];
      for (let row = 0; row < NUM_ROWS; row++) {
        const currNode = {
          col,
          row,
          isStart: col === START_NODE_X && row === START_NODE_Y,
          isEnd: col === END_NODE_X && row === END_NODE_Y,
          isVisited: false,
          isWall: false,
          distance: Infinity,
          predecessor: null,
        };
        currCol.push(currNode);
      }
      nodes.push(currCol);
    }

    this.setState({ nodes });
  }

  visualizeDijkstras = () => {
    const graph = [...this.state.nodes];
    const startNode = graph[START_NODE_X][START_NODE_Y];
    const endNode = graph[END_NODE_X][END_NODE_Y];
    const visitedNodes = dijkstras(graph, startNode, endNode);
    console.log(visitedNodes);

    for (let i = 0; i < visitedNodes.length; i++) {
      let currNode = visitedNodes[i];
      let newNode = {
        ...currNode,
        isVisited: true,
      };
      let { col, row } = newNode;
      setTimeout(() => {
        graph[col][row] = newNode;
        this.setState({ nodes: graph });
      }, 30 * i);
    }
  };

  render() {
    return (
      <React.Fragment>
        <button onClick={this.visualizeDijkstras}>Visualize Dijkstra's</button>
        <div className="grid">
          {this.state.nodes.map((col, colIdx) => {
            return (
              <div key={colIdx}>
                {col.map((node, rowIdx) => (
                  <Node key={rowIdx} id={`${colIdx} ${rowIdx}`} node={node} />
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
