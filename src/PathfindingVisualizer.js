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
    start: { x: START_NODE_X, y: START_NODE_Y },
    end: { x: END_NODE_X, y: END_NODE_Y },
    mouseIsPressed: false,
    startIsPressed: false,
    endIsPressed: false,
    selectedAlgorithm: "",
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
    const { start, end } = this.state;
    const startNode = graph[start.x][start.y];
    const endNode = graph[end.x][end.y];
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
      this.toggleWall(currNode, graph);
      this.setState({ mouseIsPressed: true });
    } else {
      if (currNode.isStart) {
        this.setState({ mouseIsPressed: true, startIsPressed: true });
      } else {
        this.setState({ mouseIsPressed: true, endIsPressed: true });
      }
    }
  };

  handleMouseEnter = (x, y) => {
    if (!this.state.mouseIsPressed) {
      return;
    }

    const graph = [...this.state.nodes];
    const currNode = graph[x][y];

    if (this.state.startIsPressed) {
      this.changeStartNode(currNode, graph);
      return;
    } else if (this.state.endIsPressed) {
      this.changeEndNode(currNode, graph);
      return;
    }

    if (!currNode.isStart && !currNode.isEnd) {
      this.toggleWall(currNode, graph);
    }
  };

  handleMouseUp = () => {
    this.setState({
      mouseIsPressed: false,
      startIsPressed: false,
      endIsPressed: false,
    });
  };

  // setSelectedAlgorithm = (algorithm) => {
  // 	this.setState(selectAlgorithm: algorithm);
  // }

  render() {
    return (
      <React.Fragment>
        <NavBar
          onVisualizeDijkstras={this.visualizeDijkstras}
          // selectAlgorithm={this.setSelectedAlgorithm}
        />
        {/* <button onClick={this.visualizeDijkstras}>Visualize Dijkstra's</button> */}
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

  /**
   * 	toggles the given node at x,y on the graph as/not as a wall
   * @param {*} currNode
   * @param {*} graph
   */
  toggleWall(currNode, graph) {
    const newNode = {
      ...currNode,
      isWall: !currNode.isWall,
    };

    graph[currNode.col][currNode.row] = newNode;
    this.setState({ nodes: graph });
  }

  /**
   * sets given node as the end node
   * @param {*} currNode
   * @param {*} graph
   */
  changeEndNode(currNode, graph) {
    const { col, row } = currNode;
    const { x, y } = this.state.end;
    graph[x][y].isEnd = false;
    currNode.isEnd = true;
    this.setState({ nodes: graph, end: { x: col, y: row } });
  }

  /**
   * sets given node as the start node
   * @param {*} currNode
   * @param {*} graph
   */
  changeStartNode(currNode, graph) {
    const { col, row } = currNode;
    const { x, y } = this.state.start;
    graph[x][y].isStart = false;
    currNode.isStart = true;
    this.setState({ nodes: graph, start: { x: col, y: row } });
  }
}

export default PathfindingVisualizer;
