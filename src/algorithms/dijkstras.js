function dijkstras(graph, startNode, endNode) {
  // track distances from start node
  let distances = {};
  // track predecessor of each node
  let parent = {};
  // track visited nodes in order
  let visited = [];
  // initialize source
  distances[startNode] = 0;

  // set all distances to be inifinite except for start node
  for (const col of graph) {
    for (const node of col) {
      if (node !== startNode) {
        distances[node] = Infinity;
        parent[node] = null;
      }
    }
  }

  // start at source node
  let currNode = startNode;

  // for that node:
  while (currNode) {
    // distance from start node
    let distance = distances[currNode];

    // if distance of closest node is inifinity, we are trapped
    if (distance === Infinity) {
      return visited;
    }

    // move current node to visited set
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
      if (distances[currNode] + 1 < distances[neighbour]) {
        distances[neighbour] = distances[currNode] + 1;
        parent[neighbour] = currNode;
      }
    }

    // move to nearest unvisited, non-wall neighbour node
    currNode = shortestDistanceNode(distances);
  }
}

/*
returns node with shortest distance from the start node
that is unvisited and not a wall
*/
function shortestDistanceNode(distances) {
  let shortest;

  for (let node in distances) {
    if (shortest === null || distances[node] < distances[shortest]) {
      if (!node.isVisited && !node.isWall) {
        shortest = node;
      }
    }
  }

  return shortest;
}

function getUnvisitedNeighbours(graph, node) {
  const neighbours = [];
  const { col, row } = node;
  if (row > 0) neighbours.push(graph[col][row - 1]);
  if (col < graph.length - 1) neighbours.push(graph[col + 1][row]);
  if (row < graph[0].length - 1) neighbours.push(graph[col][row + 1]);
  if (col > 0) neighbours.push(graph[col - 1][row]);

  return neighbours.filter((n) => !n.isVisited && !n.isWall);
}

function getShortestPath(parent, startNode, endNode) {
  const path = [];
  let currNode = endNode;
  while (parent[currNode] !== null) {
    path.push(currNode);
    currNode = parent[currNode];
  }

  return path.reverse();
}
