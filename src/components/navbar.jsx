import React, { Component } from "react";
import {
  Navbar,
  Nav,
  NavDropdown,
  Button,
  Popover,
  OverlayTrigger,
} from "react-bootstrap";

const DIJKSTRAS_LABEL = "Dijkstra's";
const BFS_LABEL = "BFS";
const DFS_LABEL = "DFS";
const ASTAR_LABEL = "A*";

const ConditionalWrapper = ({ condition, wrapper, children }) =>
  condition ? wrapper(children) : children;

class NavBar extends Component {
  getPopoverMessage = () => {
    if (this.props.selectedAlgorithm === "") {
      return "Select an algorithm to visualize!";
    }
    return "";
  };

  render() {
    return (
      // <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
      //   <a class="navbar-brand" href="#">
      //     Pathfinding Visualizer
      //   </a>
      //   <button
      //     class="navbar-toggler"
      //     type="button"
      //     data-toggle="collapse"
      //     data-target="#navbarNavDropdown"
      //     aria-controls="navbarNavDropdown"
      //     aria-expanded="false"
      //     aria-label="Toggle navigation"
      //   >
      //     <span class="navbar-toggler-icon"></span>
      //   </button>
      //   <div class="collapse navbar-collapse" id="navbarNavDropdown">
      //     <ul class="navbar-nav">
      //       <li class="nav-item active">
      //         <a class="nav-link" href="#">
      //           About <span class="sr-only">(current)</span>
      //         </a>
      //       </li>
      //       <li class="nav-item dropdown">
      //         <a
      //           class="nav-link dropdown-toggle"
      //           href="#"
      //           id="navbarDropdownMenuLink"
      //           role="button"
      //           data-toggle="dropdown"
      //           aria-haspopup="true"
      //           aria-expanded="false"
      //         >
      //           Algorithms
      //         </a>
      //         <div
      //           class="dropdown-menu"
      //           aria-labelledby="navbarDropdownMenuLink"
      //         >
      //           <button
      //             onClick={() => this.props.setAlgorithm("Dijkstra's")}
      //             class="dropdown-item"
      //             href="#"
      //           >
      //             Dijkstra's
      //           </button>
      //           <button
      //             onClick={() => this.props.setAlgorithm("BFS")}
      //             class="dropdown-item"
      //             href="#"
      //           >
      //             Breadth First Search
      //           </button>
      //           <button
      //             onClick={() => this.props.setAlgorithm("DFS")}
      //             class="dropdown-item"
      //             href="#"
      //           >
      //             Depth First Search
      //           </button>
      //           <button
      //             onClick={() => this.props.setAlgorithm("A*")}
      //             class="dropdown-item"
      //             href="#"
      //           >
      //             A*
      //           </button>
      //         </div>
      //       </li>
      //       <li class="nav-item">
      //         <button
      //           onClick={this.props.onVisualize}
      //           class="btn btn-info btn-m"
      //           // href="#"
      //         >
      //           {`Visualize ${this.props.selectedAlgorithm}`}
      //         </button>
      //       </li>
      //       <li class="nav-item">
      //         <button
      //           onClick={this.props.onClearPath}
      //           class="btn btn-dark"
      //           href="#"
      //         >
      //           Clear Path
      //         </button>
      //       </li>
      //       <li class="nav-item">
      //         <button
      //           onClick={this.props.onClearWalls}
      //           class="btn btn-dark"
      //           href="#"
      //         >
      //           Clear Walls
      //         </button>
      //       </li>
      //       <li class="nav-item">
      //         <button
      //           onClick={this.props.onReset}
      //           class="btn btn-dark"
      //           href="#"
      //         >
      //           Reset
      //         </button>
      //       </li>
      //     </ul>
      //   </div>
      // </nav>

      <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
        <Navbar.Brand href="#home">Pathfinding Visualizer</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link href="#features">About</Nav.Link>
            <NavDropdown title="Algorithms" id="collasible-nav-dropdown">
              <NavDropdown.Item
                href="#action/3.1"
                onSelect={() => this.props.setAlgorithm("Dijkstra's")}
              >
                Dijkstra's
              </NavDropdown.Item>
              <NavDropdown.Item
                href="#action/3.2"
                onSelect={() => this.props.setAlgorithm("BFS")}
              >
                Breadth First Search
              </NavDropdown.Item>
              <NavDropdown.Item
                href="#action/3.3"
                onSelect={() => this.props.setAlgorithm("DFS")}
              >
                Depth First Search
              </NavDropdown.Item>
              <NavDropdown.Item
                href="#action/3.4"
                onSelect={() => this.props.setAlgorithm("A*")}
              >
                A*
              </NavDropdown.Item>
            </NavDropdown>
            <ConditionalWrapper
              condition={this.props.popoverOpen}
              wrapper={(children) => (
                <OverlayTrigger
                  trigger="focus"
                  overlay={<Popover>Select an algorithm to visualize!</Popover>}
                  placement="bottom"
                >
                  {children}
                </OverlayTrigger>
              )}
            >
              {/* <OverlayTrigger
              trigger="focus"
              placement="bottom"
              overlay={<Popover>{""}</Popover>}
            > */}
              <span>
                <Button variant="info" onClick={this.props.onVisualize}>
                  {`Visualize ${this.props.selectedAlgorithm}`}
                </Button>{" "}
              </span>
              {/* </OverlayTrigger> */}
            </ConditionalWrapper>
            <Button variant="dark" onClick={this.props.onClearPath}>
              Clear Path
            </Button>{" "}
            <Button variant="dark" onClick={this.props.onClearWalls}>
              Clear Walls
            </Button>{" "}
            <Button variant="dark" onClick={this.props.onReset}>
              Reset
            </Button>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}

export default NavBar;
