import Queue from "./Queue";
import { getUnvisitedNeighbours } from "./dijkstras";

function bfs(graph, startNode, endNode) {
  const q = new Queue();
  const visited = [];

  q.enqueue(startNode);

  while (!q.isEmpty()) {
    let node = q.dequeue();

    if (node === endNode) {
      return visited;
    }
    let neighbours = getUnvisitedNeighbours(graph, node);
    for (let neighbour of neighbours) {
      neighbour.isVisited = true;
      visited.push(neighbour);
      neighbour.predecessor = node;
      q.enqueue(neighbour);
    }
  }

  return visited;
}
