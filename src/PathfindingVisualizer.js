import React, { Component } from "react";
import NavBar from "./components/navbar";
import {
  DIJKSTRAS_LABEL,
  BFS_LABEL,
  DFS_LABEL,
  ASTAR_LABEL,
  GREEDY_BEST_FIRST_LABEL,
} from "./components/navbar";
import Legend from "./components/legend";
import Node from "./components/node.jsx";
import "./PathfindingVisualizer.css";
import { dijkstras, getShortestPath } from "./algorithms/dijkstras";
import { bfs } from "./algorithms/bfs";
import { dfs } from "./algorithms/dfs";
import { aStar } from "./algorithms/aStar";
import { greedyBestFirstSearch } from "./algorithms/greedyBestFirstSearch";

const START_NODE_X = 12;
const START_NODE_Y = 10;
const END_NODE_X = 30;
const END_NODE_Y = 10;
const NUM_COLS = 43;
const NUM_ROWS = 21;
const TIME = 0;

class PathfindingVisualizer extends Component {
  state = {
    nodes: [],
    start: { x: START_NODE_X, y: START_NODE_Y },
    end: { x: END_NODE_X, y: END_NODE_Y },
    mouseIsPressed: false,
    startIsPressed: false,
    endIsPressed: false,
    selectedAlgorithm: "",
    legend: {
      timeTaken: TIME.toFixed(3),
      algorithmMessage: "",
    },
    isAnimating: false,
  };

  componentDidMount() {
    const nodes = this.getInitialGraph();
    this.setState({ nodes });
  }

  /**
   * animates traversal of given algorithm on current graph state
   * @param {*} algorithm algorithm to visualize
   */
  visualize(algorithm) {
    this.resetNodesToUnvisited();

    // deep copy of the state's nodes
    const graph = this.state.nodes.map((col) => {
      return col.map((node) => {
        let newNode = {};
        for (let key in node) {
          newNode[key] = node[key];
        }
        return newNode;
      });
    });

    const { start, end } = this.state;
    const startNode = graph[start.x][start.y];
    const endNode = graph[end.x][end.y];
    const startTime = performance.now();

    const visitedNodes = algorithm(graph, startNode, endNode);

    // get time allotted for searching animation to finish
    const endTime = performance.now();
    const time = (endTime - startTime).toFixed(3);

    // start animation of traversal
    this.setState({ isAnimating: true });
    // for each visited node:
    // one extra iteration to animate path
    for (let i = 0; i <= visitedNodes.length; i++) {
      // if on last iteration, animate path
      // timeout proportional to iteration number so path animates after visited nodes
      if (i === visitedNodes.length) {
        setTimeout(() => {
          const shortestPath = getShortestPath(endNode);
          this.animatePath(shortestPath);

          setTimeout(() => {
            this.setState({ nodes: graph, isAnimating: false });

            this.setState({ legend: { timeTaken: time } });
          }, 30 * shortestPath.length + 1200); /** delay until last iteration of path animation
                                                plus amount of seconds to animate path node */
        }, 15 * i + 500);

        return;
      }

      let currNode = visitedNodes[i];
      const { col, row } = currNode;
      // animate each node to change colour one after another
      // timeout based on position in list so that
      // each node should only changes colour after the previously visited one has changed colour
      setTimeout(() => {
        document.getElementById(`node ${col} ${row}`).className +=
          " visited-animation";
      }, 15 * i);
    }
  }

  /**
   * animates the given shortest path nodes in order
   * @param {*} shortestPath
   */
  animatePath(shortestPath) {
    for (let i = 0; i < shortestPath.length; i++) {
      let currNode = shortestPath[i];
      const { col, row } = currNode;
      setTimeout(() => {
        document.getElementById(`node ${col} ${row}`).className +=
          " path-animation";
      }, 30 * i);
    }
  }

  handleMouseDown = (x, y) => {
    // don't allow user to edit board while animating an algorithm
    if (this.state.isAnimating) {
      return;
    }

    const graph = [...this.state.nodes];
    const currNode = graph[x][y];
    if (!currNode.isStart && !currNode.isEnd) {
      this.setState({ mouseIsPressed: true });
      this.toggleWall(currNode, graph);
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

    this.toggleWall(currNode, graph);
  };

  handleMouseUp = () => {
    // make sure that where start and end node are placed is not ON a wall
    const nodes = [...this.state.nodes];
    const { start, end } = this.state;
    nodes[start.x][start.y].isWall = false;
    nodes[end.x][end.y].isWall = false;

    this.setState({
      nodes,
      mouseIsPressed: false,
      startIsPressed: false,
      endIsPressed: false,
    });
  };

  setSelectedAlgorithm = (algorithm) => {
    this.setState({ selectedAlgorithm: algorithm });
  };

  handleVisualize = () => {
    const { selectedAlgorithm } = this.state;

    switch (selectedAlgorithm) {
      case DIJKSTRAS_LABEL:
        this.visualize(dijkstras);
        break;
      case BFS_LABEL:
        this.visualize(bfs);
        break;
      case DFS_LABEL:
        this.visualize(dfs);
        break;
      case ASTAR_LABEL:
        this.visualize(aStar);
        break;
      case GREEDY_BEST_FIRST_LABEL:
        this.visualize(greedyBestFirstSearch);
        break;
      default:
        alert("Select an algorithm to visualize!");
        return;
    }
  };

  /**
   * resets graph to the intial graph
   */
  handleReset = () => {
    const nodes = this.getInitialGraph();
    this.setState({
      nodes,
      start: { x: START_NODE_X, y: START_NODE_Y },
      end: { x: END_NODE_X, y: END_NODE_Y },
    });
  };

  /**
   * clears all walls from graph without moving start and end nodes
   */
  clearWalls = () => {
    const graph = [...this.state.nodes];
    for (let x = 0; x < NUM_COLS; x++) {
      for (let y = 0; y < NUM_ROWS; y++) {
        let node = graph[x][y];
        node.isWall = false;
      }
    }

    this.setState({ nodes: graph });
  };

  render() {
    return (
      <React.Fragment>
        <NavBar
          setAlgorithm={this.setSelectedAlgorithm}
          selectedAlgorithm={this.state.selectedAlgorithm}
          onVisualize={this.handleVisualize}
          onReset={this.handleReset}
          onClearPath={this.resetNodesToUnvisited}
          onClearWalls={this.clearWalls}
          isAnimating={this.state.isAnimating}
        />
        <Legend legend={this.state.legend} />
        <div className="grid">
          {this.state.nodes.map((col, colIdx) => (
              <div key={colIdx}>
                {col.map((node, rowIdx) => (
                  <Node
                    key={rowIdx}
                    onMouseDown={this.handleMouseDown}
                    onMouseEnter={this.handleMouseEnter}
                    onMouseUp={this.handleMouseUp}
                    isAnimating={this.state.isAnimating}
                    col={node.col}
                    row={node.row}
                    isStart={node.isStart}
                    isEnd={node.isEnd}
                    isVisited={node.isVisited}
                    isPath={node.isPath}
                    isWall={node.isWall}
                  />
                ))}
              </div>
          ))}
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
    if (currNode.isStart || currNode.isEnd) {
      return;
    }
    // animate the wall/dewall animation
    if (!currNode.isWall) {
      document.getElementById(`node ${currNode.col} ${currNode.row}`).className +=
      " wall-animation";
    }else {
      document.getElementById(`node ${currNode.col} ${currNode.row}`).className +=
      " dewall-animation";
    }

    const newNode = {
      ...currNode,
      isWall: !currNode.isWall,
    };
    // set state after wall is done animating
    setTimeout(() => {
      graph[currNode.col][currNode.row] = newNode;
      this.setState({ nodes: graph });
    }, 200);
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
    // currNode.isWall = false;
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
    // currNode.isWall = false;
    this.setState({ nodes: graph, start: { x: col, y: row } });
  }

  /**
   * resets state's nodes to before search algorithm was called
   */
  resetNodesToUnvisited = () => {
    const graph = [...this.state.nodes];
    for (let x = 0; x < NUM_COLS; x++) {
      for (let y = 0; y < NUM_ROWS; y++) {
        let node = graph[x][y];
        node.isVisited = false;
        node.isPath = false;
        node.distance = Infinity;
        node.predecessor = null;
      }
    }

    this.setState({ nodes: graph });
  };

  /**
   * returns initial graph with no walls toggled or visited nodes
   */
  getInitialGraph() {
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
          f: Infinity,
          predecessor: null,
        };
        currCol.push(currNode);
      }
      nodes.push(currCol);
    }
    return nodes;
  }
}

export default PathfindingVisualizer;
