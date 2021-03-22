import PriorityQueue from "./PriorityQueue";
import { getUnvisitedNeighbours } from "./dijkstras";

export function greedyBestFirstSearch(graph, startNode, endNode) {
    const openSet = new PriorityQueue(function (node) {
        return node.f;
      });
    
      const visited = []; // closed set
    
      // initialize open set
      startNode.f = 0;
      startNode.distance = 0;
      openSet.push(startNode);
    
      while (!openSet.isEmpty()) {
        // find node with least f on open set
        let currNode = openSet.pop();
    
        currNode.isVisited = true;
        visited.push(currNode);
    
        if (currNode === endNode) {
          return visited;
        }
    
        let neighbours = getUnvisitedNeighbours(graph, currNode);
        for (let neighbour of neighbours) {
          if (currNode.distance + neighbour.weight < neighbour.distance) {
            neighbour.predecessor = currNode;
            neighbour.distance = currNode.distance + neighbour.weight;
    
            // calculate manhattan distance heuristic for neighbour
            let h =
              Math.abs(neighbour.col - endNode.col) +
              Math.abs(neighbour.row - endNode.row);
            neighbour.f = h;
    
            openSet.push(neighbour);
          }
        }
      }
    
      return visited;
}