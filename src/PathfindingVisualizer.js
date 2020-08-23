import React, { Component } from "react";
import NavBar from "./components/navbar";
import Node from "./components/node.jsx";
import "./PathfindingVisualizer.css";
import { dijkstras, getShortestPath } from "./algorithms/dijkstras";

const START_NODE_X = 12;
const START_NODE_Y = 9;
const END_NODE_X = 26;
const END_NODE_Y = 9;
const NUM_COLS = 39;
const NUM_ROWS = 19;

class PathfindingVisualizer extends Component {
  state = {
    nodes: [],
    mouseIsPressed: false,
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
          isPath: false,
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

    for (let i = 0; i <= visitedNodes.length; i++) {
      if (i === visitedNodes.length) {
        setTimeout(() => {
          const shortestPath = getShortestPath(endNode);
          this.animatePath(shortestPath, graph);
        }, 15 * i);

        return;
      }

      let currNode = visitedNodes[i];
      // let newNode = {
      //   ...currNode,
      //   isVisited: true,
      // };
      // let { col, row } = newNode;
      const { col, row } = currNode;
      setTimeout(() => {
        // graph[col][row] = newNode;
        // this.setState({ nodes: graph });
        document.getElementById(`node ${col} ${row}`).className += " visited";
      }, 15 * i);
    }
  };

  animatePath(shortestPath, graph) {
    for (let i = 0; i < shortestPath.length; i++) {
      let currNode = shortestPath[i];
      // let newNode = {
      //   ...currNode,
      //   isPath: true,
      // };
      // let { col, row } = newNode;
      const { col, row } = currNode;
      setTimeout(() => {
        // graph[col][row] = newNode;
        // this.setState({ nodes: graph });
        document.getElementById(`node ${col} ${row}`).className += " path";
      }, 30 * i);
    }
  }

  handleMouseDown = (x, y) => {
    const graph = [...this.state.nodes];
    const currNode = graph[x][y];
    if (!currNode.isStart && !currNode.isEnd) {
      const newNode = {
        ...currNode,
        isWall: !currNode.isWall,
      };

      graph[x][y] = newNode;
      this.setState({ nodes: graph, mouseIsPressed: true });
    }
  };

  handleMouseEnter = (x, y) => {
    if (this.state.mouseIsPressed) {
      const graph = [...this.state.nodes];
      const currNode = graph[x][y];
      if (!currNode.isStart && !currNode.isEnd) {
        const newNode = {
          ...currNode,
          isWall: !currNode.isWall,
        };

        graph[x][y] = newNode;
        this.setState({ nodes: graph });
      }
    }
  };

  handleMouseUp = () => {
    this.setState({ mouseIsPressed: false });
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
                  <Node
                    key={rowIdx}
                    onMouseDown={this.handleMouseDown}
                    onMouseEnter={this.handleMouseEnter}
                    onMouseUp={this.handleMouseUp}
                    node={node}
                  />
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
