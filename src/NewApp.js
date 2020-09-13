import React, { useState } from "react";
import NavBar from "./components/navbar";
import Legend from "./components/legend";
import Node from "./components/node.jsx";
import "./PathfindingVisualizer.css";
import { dijkstras, getShortestPath } from "./algorithms/dijkstras";
import { bfs } from "./algorithms/bfs";
import { dfs } from "./algorithms/dfs";
import { aStar } from "./algorithms/aStar";

const START_NODE_X = 12;
const START_NODE_Y = 9;
const END_NODE_X = 26;
const END_NODE_Y = 9;
const NUM_COLS = 39;
const NUM_ROWS = 19;

function PathfindingVisualizer() {
  const [nodes, setNodes] = useState(() => {
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
  });

  // const animationState = () => {
  //   const isAnimating = {};
  //   for (let x = 0; x < NUM_COLS; x++) {
  //     for (let y = 0; y < NUM_ROWS; y++) {
  //       isAnimating[`${x} ${y}`] = false;
  //     }
  //   }
  //   return isAnimating;
  // };

  const [isAnimating, setIsAnimating] = useState(() => {
    const state = {};
    for (let x = 0; x < NUM_COLS; x++) {
      for (let y = 0; y < NUM_ROWS; y++) {
        state[`${x} ${y}`] = { visitedAnimating: false, pathAnimating: false };
      }
    }
    return state;
  });

  const [start, setStart] = useState({ x: START_NODE_X, y: START_NODE_Y });
  const [end, setEnd] = useState({ x: END_NODE_X, y: END_NODE_Y });
  const [mouseIsPressed, setMouseIsPressed] = useState(false);
  const [startIsPressed, setStartIsPressed] = useState(false);
  const [endIsPressed, setEndIsPressed] = useState(false);
  const [selectedAlgorithm, setSelectedAlgorithm] = useState("");
  const [legend, setLegend] = useState({ timeTaken: 0, algorithmMessage: "" });

  // function visualize(algorithm) {
  //   resetNodesToUnvisited();

  //   const graph = [...nodes];
  //   const startNode = graph[start.x][start.y];
  //   const endNode = graph[end.x][end.y];
  //   const startTime = performance.now();

  //   const visitedNodes = algorithm(graph, startNode, endNode);

  //   // for each visited node:
  //   // one extra iteration to animate path
  //   for (let i = 0; i <= visitedNodes.length; i++) {
  //     // if on last iteration, animate path
  //     // timeout proportional to iteration number so path animates after visited nodes
  //     if (i === visitedNodes.length) {
  //       setTimeout(() => {
  //         const shortestPath = getShortestPath(endNode);
  //         animatePath(shortestPath);
  //         console.log(isAnimating);
  //         // get time allotted for searching animation to finish
  //         const time = getTimeAlotted(startTime);
  //         setLegend((prevLegend) => {
  //           return {
  //             ...prevLegend,
  //             timeTaken: time,
  //           };
  //         });
  //       }, 15 * i);

  //       return;
  //     }

  //     let currNode = visitedNodes[i];
  //     const { col, row } = currNode;
  //     // animate each node to change colour one after another
  //     // timeout based on position in list so that
  //     // each node should only changes colour after the previously visited one has changed colour
  //     setTimeout(() => {
  //       // document.getElementById(`node ${col} ${row}`).className += " visited";
  //       setIsAnimating((prevIsAnimating) => {
  //         // prevIsAnimating[`${col} ${row}`].visitedAnimating = true;
  //         // return prevIsAnimating;
  //         return {
  //           ...prevIsAnimating,
  //           [`${col} ${row}`]: {
  //             ...prevIsAnimating[`${col} ${row}`],
  //             visitedAnimating: true,
  //           },
  //         };
  //       });
  //     }, 15 * i);
  //   }
  // }

  function visualize(visitedNodes, shortestPath) {
    const startTime = performance.now();

    // for each visited node:
    // one extra iteration to animate path
    for (let i = 0; i <= visitedNodes.length; i++) {
      // if on last iteration, animate path
      // timeout proportional to iteration number so path animates after visited nodes
      if (i === visitedNodes.length) {
        setTimeout(() => {
          animatePath(shortestPath);
          // get time allotted for searching animation to finish
          const time = getTimeAlotted(startTime);
          setLegend((prevLegend) => {
            return {
              ...prevLegend,
              timeTaken: time,
            };
          });
        }, 15 * i);

        return;
      }

      let currNode = visitedNodes[i];
      const { col, row } = currNode;
      // animate each node to change colour one after another
      // timeout based on position in list so that
      // each node should only changes colour after the previously visited one has changed colour
      setTimeout(() => {
        setIsAnimating((prevIsAnimating) => {
          return {
            ...prevIsAnimating,
            [`${col} ${row}`]: {
              ...prevIsAnimating[`${col} ${row}`],
              visitedAnimating: true,
            },
          };
        });
      }, 15 * i);
    }
  }

  /**
   * animates the given shortest path nodes in order
   * @param {*} shortestPath
   */
  function animatePath(shortestPath) {
    for (let i = 0; i < shortestPath.length; i++) {
      let currNode = shortestPath[i];
      const { col, row } = currNode;
      setTimeout(() => {
        setIsAnimating((prevIsAnimating) => {
          // prevIsAnimating[`${col} ${row}`].pathAnimating = true;
          // return prevIsAnimating;
          return {
            ...prevIsAnimating,
            [`${col} ${row}`]: {
              ...prevIsAnimating[`${col} ${row}`],
              pathAnimating: true,
            },
          };
        });
      }, 30 * i);
    }
  }

  /**
   * returns time allotted since start time in s
   * @param {*} startTime
   */
  function getTimeAlotted(startTime) {
    const endTime = performance.now();
    const time = (endTime - startTime) / 1000;
    return time.toFixed(3);
  }

  const handleMouseDown = (x, y) => {
    const graph = [...nodes];
    const currNode = graph[x][y];
    if (!currNode.isStart && !currNode.isEnd) {
      toggleWall(currNode, graph);
      // this.setState({ mouseIsPressed: true });
      setMouseIsPressed(true);
    } else {
      if (currNode.isStart) {
        // this.setState({ mouseIsPressed: true, startIsPressed: true });
        setMouseIsPressed(true);
        setStartIsPressed(true);
      } else {
        // this.setState({ mouseIsPressed: true, endIsPressed: true });
        setMouseIsPressed(true);
        setEndIsPressed(true);
      }
    }
  };

  const handleMouseEnter = (x, y) => {
    if (!mouseIsPressed) {
      return;
    }

    const graph = [...nodes];
    const currNode = graph[x][y];

    if (startIsPressed) {
      changeStartNode(currNode, graph);
      return;
    } else if (endIsPressed) {
      changeEndNode(currNode, graph);
      return;
    }

    if (!currNode.isStart && !currNode.isEnd) {
      toggleWall(currNode, graph);
    }
  };

  const handleMouseUp = () => {
    // make sure that where start and end node are placed is not ON a wall
    const graph = [...nodes];
    // const { start, end } = this.state;
    graph[start.x][start.y].isWall = false;
    graph[end.x][end.y].isWall = false;

    setNodes(graph);
    setMouseIsPressed(false);
    setStartIsPressed(false);
    setEndIsPressed(false);
  };

  const setAlgorithm = (algorithm) => {
    // this.setState({ selectedAlgorithm: algorithm });
    setSelectedAlgorithm(algorithm);
  };

  // const handleVisualize = () => {
  //   // const { selectedAlgorithm } = this.state;

  //   switch (selectedAlgorithm) {
  //     case "Dijkstra's":
  //       visualize(dijkstras);
  //       break;
  //     case "BFS":
  //       visualize(bfs);
  //       break;
  //     case "DFS":
  //       visualize(dfs);
  //       break;
  //     case "A*":
  //       visualize(aStar);
  //       break;
  //     default:
  //       alert("Select an algorithm to visualize!");
  //       return;
  //   }
  // };

  const handleVisualize = () => {
    resetNodesToUnvisited();
    const graph = nodes.map((col) => {
      return col.map((node) => {
        let newNode = {};
        for (let key in node) {
          newNode[key] = node[key];
        }
        return newNode;
      });
    });

    const startNode = graph[start.x][start.y];
    const endNode = graph[end.x][end.y];

    let visitedNodes = null;

    switch (selectedAlgorithm) {
      case "Dijkstra's":
        visitedNodes = dijkstras(graph, startNode, endNode);
        break;
      case "BFS":
        visitedNodes = bfs(graph, startNode, endNode);
        break;
      case "DFS":
        visitedNodes = dfs(graph, startNode, endNode);
        break;
      case "A*":
        visitedNodes = aStar(graph, startNode, endNode);
        break;
      default:
        alert("Select an algorithm to visualize!");
        return;
    }
    const shortestPath = getShortestPath(endNode);
    setNodes(graph);
    console.log(visitedNodes);
    // visualize(visitedNodes, shortestPath);
  };

  /**
   * resets graph to the intial graph
   */
  const handleReset = () => {
    const graph = getInitialGraph();
    // this.setState({
    //   nodes,
    //   start: { x: START_NODE_X, y: START_NODE_Y },
    //   end: { x: END_NODE_X, y: END_NODE_Y },
    // });
    setNodes(graph);
    setStart({ x: START_NODE_X, y: START_NODE_Y });
    setEnd({ x: END_NODE_X, y: END_NODE_Y });
  };

  /**
   * clears all walls from graph without moving start and end nodes
   */
  const clearWalls = () => {
    const graph = [...nodes];
    for (let x = 0; x < NUM_COLS; x++) {
      for (let y = 0; y < NUM_ROWS; y++) {
        let node = graph[x][y];
        node.isWall = false;
      }
    }

    // this.setState({ nodes: graph });
    setNodes(graph);
  };

  /**
   * 	toggles the given node at x,y on the graph as/not as a wall
   * @param {*} currNode
   * @param {*} graph
   */
  function toggleWall(currNode, graph) {
    const newNode = {
      ...currNode,
      isWall: !currNode.isWall,
    };

    graph[currNode.col][currNode.row] = newNode;
    // this.setState({ nodes: graph });
    setNodes(graph);
  }

  /**
   * sets given node as the end node
   * @param {*} currNode
   * @param {*} graph
   */
  function changeEndNode(currNode, graph) {
    const { col, row } = currNode;
    const { x, y } = end;
    graph[x][y].isEnd = false;
    currNode.isEnd = true;
    // this.setState({ nodes: graph, end: { x: col, y: row } });
    setEnd({ x: col, y: row });
    setNodes(graph);
  }

  /**
   * sets given node as the start node
   * @param {*} currNode
   * @param {*} graph
   */
  function changeStartNode(currNode, graph) {
    const { col, row } = currNode;
    const { x, y } = start;
    graph[x][y].isStart = false;
    currNode.isStart = true;
    // currNode.isWall = false;
    // this.setState({ nodes: graph, start: { x: col, y: row } });
    setStart({ x: col, y: row });
    setNodes(graph);
  }

  /**
   * resets state's nodes to before dijkstra's was called
   */
  const resetNodesToUnvisited = () => {
    const graph = [...nodes];
    for (let x = 0; x < NUM_COLS; x++) {
      for (let y = 0; y < NUM_ROWS; y++) {
        let node = graph[x][y];
        node.isVisited = false;
        node.isPath = false;
        node.distance = Infinity;
        node.predecessor = null;
      }
    }

    // this.setState({ nodes: graph });
    setNodes(graph);
  };

  /**
   * returns initial graph with no walls toggled or visited nodes
   */
  function getInitialGraph() {
    const graph = [];

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
      graph.push(currCol);
    }
    return graph;
  }

  return (
    <div>
      <NavBar
        setAlgorithm={(algorithm) => setSelectedAlgorithm(algorithm)}
        selectedAlgorithm={selectedAlgorithm}
        onVisualize={handleVisualize}
        onReset={handleReset}
        onClearPath={resetNodesToUnvisited}
        onClearWalls={clearWalls}
      />
      <Legend legend={legend} />
      <div key={new Date()} className="grid">
        {nodes.map((col, colIdx) => {
          return (
            <div key={colIdx}>
              {col.map((node, rowIdx) => (
                <Node
                  key={rowIdx}
                  onMouseDown={handleMouseDown}
                  onMouseEnter={handleMouseEnter}
                  onMouseUp={handleMouseUp}
                  isAnimating={isAnimating[`${colIdx} ${rowIdx}`]}
                  node={node}
                />
              ))}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default PathfindingVisualizer;
