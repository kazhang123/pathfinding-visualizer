import React, { Component } from "react";
import { Navbar, Nav, NavDropdown, Button } from "react-bootstrap";

export const DIJKSTRAS_LABEL = "Dijkstra's";
export const BFS_LABEL = "BFS";
export const DFS_LABEL = "DFS";
export const ASTAR_LABEL = "A*";

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
                onSelect={() => this.props.setAlgorithm(ASTAR_LABEL)}
              >
                A*
              </NavDropdown.Item>
            </NavDropdown>
            <span>
              <Button variant="info" onClick={this.props.onVisualize}>
                {`Visualize ${this.props.selectedAlgorithm}`}
              </Button>{" "}
            </span>
            <Button variant="light" onClick={this.props.onClearPath}>
              Clear Path
            </Button>{" "}
            <Button variant="light" onClick={this.props.onClearWalls}>
              Clear Walls
            </Button>{" "}
            <Button variant="light" onClick={this.props.onReset}>
              Reset
            </Button>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}

export default NavBar;
