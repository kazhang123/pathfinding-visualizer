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
    const nodes = this.getInitialGraph();
    this.setState({ nodes });
  }

  visualizeDijkstras = () => {
    this.resetNodesToUnvisited();
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
      const { col, row } = currNode;
      setTimeout(() => {
        document.getElementById(`node ${col} ${row}`).className += " visited";
      }, 15 * i);
    }
  };

  animatePath(shortestPath, graph) {
    for (let i = 0; i < shortestPath.length; i++) {
      let currNode = shortestPath[i];
      const { col, row } = currNode;
      setTimeout(() => {
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

  setSelectedAlgorithm = (algorithm) => {
    this.setState({ selectedAlgorithm: algorithm });
  };

  handleVisualize = () => {
    const { selectedAlgorithm } = this.state;
    switch (selectedAlgorithm) {
      case "Dijkstra's":
        this.visualizeDijkstras();
        break;
    }
  };

  handleReset = () => {
    const nodes = this.getInitialGraph();
    this.setState({
      nodes,
      start: { x: START_NODE_X, y: START_NODE_Y },
      end: { x: END_NODE_X, y: END_NODE_Y },
    });
  };

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
        />
        <div key={new Date()} className="grid">
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

  /**
   * resets state's nodes to before dijkstra's was called
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
