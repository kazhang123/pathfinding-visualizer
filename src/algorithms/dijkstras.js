import PriorityQueue from "./PriorityQueue";

export function dijkstras(graph, startNode, endNode) {
  // track distances from start node
  // let distances = {};
  // track predecessor of each node
  // let parent = {};
  // track visited nodes in order
  let visited = [];

  let pq = new PriorityQueue(function (node) {
    return node.distance;
  });

  // // set all distances to be inifinite except for start node
  // for (const col of graph) {
  //   for (const node of col) {
  //     // if (node !== startNode) {
  //     distances[node] = Infinity;
  //     parent[node] = null;
  //     // }
  //   }
  // }

  // initialize source
  // distances[startNode] = 0;
  startNode.distance = 0;
  pq.push(startNode);
  // start at source node

  while (!pq.isEmpty()) {
    let currNode = pq.pop();
    // console.log(currNode);

    const { distance } = currNode;

    // currNode.isVisited = true;
    visited.push(currNode);
    // if current node is end node, we are done searching
    if (currNode === endNode) {
      return visited;
    }

    // for each unvisited neighbour:
    let neighbours = getUnvisitedNeighbours(graph, currNode);
    for (let neighbour of neighbours) {
      // update distance from start node and predecessor
      if (distance + 1 < neighbour.distance) {
        neighbour.distance = distance + 1;
        neighbour.predecessor = currNode;
        pq.push(neighbour);
      }
    }

    // if (currNode.col === 4 && currNode.row === 11) {
    //   const min = pq.peek();
    //   console.log(min);
    //   console.log(pq);
    // }
  }

  return visited;
  // let currNode = startNode;

  // // for that node:
  // while (currNode) {
  //   // distance from start node
  //   // let distance = distances[currNode];
  //   const { distance } = currNode;

  //   // if distance of closest node is infinity, we are trapped
  //   if (distance === Infinity) {
  //     return visited;
  //   }

  //   // move current node to visited set
  //   currNode.isVisited = true;
  //   visited.push(currNode);
  //   // if current node is end node, we are done searching
  //   if (currNode === endNode) {
  //     return visited;
  //   }

  //   // for each unvisited neighbour:
  //   let neighbours = getUnvisitedNeighbours(graph, currNode);
  //   for (let neighbour of neighbours) {
  //     // update distance from start node and predecessor
  //     if (distance + 1 < neighbour.distance) {
  //       neighbour.distance = distance + 1;
  //       neighbour.predecessor = currNode;
  //     }
  //   }

  //   // move to nearest unvisited, non-wall neighbour node
  //   currNode = shortestDistanceNode(graph);
  // }
}

/*
returns shortest path from startNode to endNode
*/
export function getShortestPath(endNode) {
  const path = [];
  let currNode = endNode;
  while (currNode !== null) {
    path.push(currNode);
    currNode = currNode.predecessor;
  }

  return path.reverse();
}

/*
returns unvisited, non-wall neighbours (N, E, S, W) of given node 
*/
export function getUnvisitedNeighbours(graph, node) {
  const neighbours = [];
  const { col, row } = node;
  if (row > 0) neighbours.push(graph[col][row - 1]);
  if (col < graph.length - 1) neighbours.push(graph[col + 1][row]);
  if (row < graph[0].length - 1) neighbours.push(graph[col][row + 1]);
  if (col > 0) neighbours.push(graph[col - 1][row]);

  return neighbours.filter((n) => !n.isVisited && !n.isWall);
}
