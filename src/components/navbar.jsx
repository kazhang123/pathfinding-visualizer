import React, { Component } from "react";
import { Navbar, Nav, NavDropdown, Button } from "react-bootstrap";

export const DIJKSTRAS_LABEL = "Dijkstra's";
export const BFS_LABEL = "BFS";
export const DFS_LABEL = "DFS";
export const ASTAR_LABEL = "A*";
export const GREEDY_BEST_FIRST_LABEL = "Greedy Best First Search";

class NavBar extends Component {
  render() {
    return (
      <Navbar collapseOnSelect expand="lg" bg="light" variant="light">
        <Navbar.Brand href="#home">Pathfinding Visualizer</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="mr-auto">
            <NavDropdown title="Algorithms" id="collasible-nav-dropdown">
              <NavDropdown.Item
                href="#action/3.1"
                onSelect={() => this.props.setAlgorithm(DIJKSTRAS_LABEL)}
              >
                Dijkstra's
              </NavDropdown.Item>
              <NavDropdown.Item
                href="#action/3.2"
                onSelect={() => this.props.setAlgorithm(BFS_LABEL)}
              >
                Breadth First Search
              </NavDropdown.Item>
              <NavDropdown.Item
                href="#action/3.3"
                onSelect={() => this.props.setAlgorithm(DFS_LABEL)}
              >
                Depth First Search
              </NavDropdown.Item>
              <NavDropdown.Item
                href="#action/3.4"
                onSelect={() => this.props.setAlgorithm(GREEDY_BEST_FIRST_LABEL)}
              >
                Greedy Best First Search
              </NavDropdown.Item>
              <NavDropdown.Item
                href="#action/3.5"
                onSelect={() => this.props.setAlgorithm(ASTAR_LABEL)}
              >
                A*
              </NavDropdown.Item>
            </NavDropdown>
            <span>
              <Button variant="info" disabled={this.props.isAnimating} onClick={this.props.onVisualize}>
                {`Visualize ${this.props.selectedAlgorithm}`}
              </Button>{" "}
            </span>
            <Button variant="light" disabled={this.props.isAnimating} onClick={this.props.onClearPath}>
              Clear Path
            </Button>{" "}
            <Button variant="light" disabled={this.props.isAnimating} onClick={this.props.onClearWalls}>
              Clear Walls
            </Button>{" "}
            <Button variant="light" disabled={this.props.isAnimating} onClick={this.props.onClearWeights}>
              Clear Weights
            </Button>
            <Button variant="light" disabled={this.props.isAnimating} onClick={this.props.onReset}>
              Reset
            </Button>
            <Button 
              variant={this.props.isAddWeightSelected ? "dark" : "outline-dark"} 
              disabled={this.props.isAnimating || this.props.selectedAlgorithm == BFS_LABEL || this.props.selectedAlgorithm == DFS_LABEL} 
              onClick={this.props.setAddWeightSelected}>
              {this.props.isAddWeightSelected ? "Stop Adding Weights" : "Add Weights"}
            </Button>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}

export default NavBar;
