import Stack from "./Stack";
import { getUnvisitedNeighbours } from "./dijkstras";

export function dfs(graph, startNode, endNode) {
  const stack = new Stack();
  const visited = [];

  stack.push(startNode);
  visited.push(startNode);
  startNode.isVisited = true;

  while (!stack.isEmpty()) {
    let currNode = stack.pop();

    let neighbours = getUnvisitedNeighbours(graph, currNode);
    for (let neighbour of neighbours) {
      neighbour.isVisited = true;
      visited.push(neighbour);
      neighbour.predecessor = currNode;

      if (neighbour === endNode) {
        return visited;
      }

      stack.push(neighbour);
    }
  }

  return visited;
}
