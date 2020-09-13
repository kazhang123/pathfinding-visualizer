import PriorityQueue from "./PriorityQueue";

export function dijkstras(graph, startNode, endNode) {
  // track visited nodes in order
  let visited = [];

  let pq = new PriorityQueue(function (node) {
    return node.distance;
  });

  // initialize source
  startNode.distance = 0;
  pq.push(startNode);
  // start at source node

  while (!pq.isEmpty()) {
    let currNode = pq.pop();
    // console.log(currNode);

    const { col, row } = currNode;

    currNode.isVisited = true;
    visited.push(currNode);
    // if current node is end node, we are done searching
    if (currNode === endNode) {
      return visited;
    }

    // for each unvisited neighbour:
    let neighbours = getUnvisitedNeighbours(graph, currNode);
    for (let neighbour of neighbours) {
      // update distance from start node and predecessor
      if (currNode.distance + 1 < neighbour.distance) {
        neighbour.distance = currNode.distance + 1;
        neighbour.predecessor = currNode;
        pq.push(neighbour);
      }
    }
  }

  return visited;
}

/*
returns shortest path from startNode to endNode
*/
export function getShortestPath(endNode) {
  const path = [];

  // If there is no path to the endNode i.e the endNode does not have a predecessor
  if (endNode.predecessor === null) {
    return [];
  }

  let currNode = endNode;
  while (currNode !== null) {
    currNode.isPath = true;
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
