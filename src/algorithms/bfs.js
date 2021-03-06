import Queue from "./Queue";
import { getUnvisitedNeighbours } from "./dijkstras";

export function bfs(graph, startNode, endNode) {
  const q = new Queue();
  const visited = [];

  q.enqueue(startNode);
  visited.push(startNode);
  startNode.isVisited = true;

  while (!q.isEmpty()) {
    let currNode = q.dequeue();

    let neighbours = getUnvisitedNeighbours(graph, currNode);
    for (let neighbour of neighbours) {
      neighbour.isVisited = true;
      visited.push(neighbour);
      neighbour.predecessor = currNode;

      if (neighbour === endNode) {
        return visited;
      }

      q.enqueue(neighbour);
    }
  }

  return visited;
}
