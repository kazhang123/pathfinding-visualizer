import React, { Component } from "react";

const DIJKSTRAS_LABEL = "Dijkstra's";
const BFS_LABEL = "Breadth First Search";
const DFS_LABEL = "Depth First Search";

class NavBar extends Component {
  render() {
    return (
      <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
        <a class="navbar-brand" href="#">
          Pathfinding Visualizer
        </a>
        <button
          class="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarNavDropdown"
          aria-controls="navbarNavDropdown"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNavDropdown">
          <ul class="navbar-nav">
            <li class="nav-item active">
              <a class="nav-link" href="#">
                About <span class="sr-only">(current)</span>
              </a>
            </li>
            {/* <li class="nav-item">
              <a class="nav-link" href="#">
                Features
              </a>
            </li> */}
            {/* <li class="nav-item">
              <a class="nav-link" href="#">
                Pricing
              </a>
            </li> */}
            <li class="nav-item dropdown">
              <a
                class="nav-link dropdown-toggle"
                href="#"
                id="navbarDropdownMenuLink"
                role="button"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                Algorithms
              </a>
              <div
                class="dropdown-menu"
                aria-labelledby="navbarDropdownMenuLink"
              >
                <button
                  onClick={() => this.props.setAlgorithm("Dijkstra's")}
                  class="dropdown-item"
                  href="#"
                >
                  Dijkstra's
                </button>
                <button
                  onClick={() => this.props.setAlgorithm("BFS")}
                  class="dropdown-item"
                  href="#"
                >
                  Breadth First Search
                </button>
                <button class="dropdown-item" href="#">
                  Depth First Search
                </button>
              </div>
            </li>
            <li class="nav-item">
              <button
                onClick={this.props.onVisualize}
                class="btn btn-info btn-m"
                // href="#"
              >
                {`Visualize ${this.props.selectedAlgorithm}`}
              </button>
            </li>
            <li class="nav-item">
              <button
                onClick={this.props.onClearPath}
                class="btn btn-dark"
                href="#"
              >
                Clear Path
              </button>
            </li>
            <li class="nav-item">
              <button
                onClick={this.props.onClearWalls}
                class="btn btn-dark"
                href="#"
              >
                Clear Walls
              </button>
            </li>
            <li class="nav-item">
              <button
                onClick={this.props.onReset}
                class="btn btn-dark"
                href="#"
              >
                Reset
              </button>
            </li>
          </ul>
        </div>
      </nav>
    );
  }
}

export default NavBar;
