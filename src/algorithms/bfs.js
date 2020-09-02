import Queue from "./Queue";
import { getUnvisitedNeighbours } from "./dijkstras";

export function bfs(graph, startNode, endNode) {
  // const q = new Queue();
  const visited = [];
  const queue = [];

  // q.enqueue(startNode);
  queue.push(startNode);
  visited.push(startNode);
  startNode.isVisited = true;

  while (queue.length > 0) {
    // let currNode = q.dequeue();
    let currNode = queue.shift();
    // visited.push(currNode);

    let neighbours = getUnvisitedNeighbours(graph, currNode);
    for (let neighbour of neighbours) {
      neighbour.isVisited = true;
      visited.push(neighbour);
      neighbour.predecessor = currNode;

      if (neighbour === endNode) {
        return visited;
      }

      // q.enqueue(neighbour);
      queue.push(neighbour);
    }
  }

  return visited;
}
