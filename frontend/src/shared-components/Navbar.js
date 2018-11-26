import React, { Component } from "react";
import { Navbar, Nav, NavItem, Image } from "react-bootstrap";
import { Link, withRouter } from "react-router-dom";
import "./Navbar.css";

class CustomNavbar extends Component {
  constructor(props) {
    super(props);
  }
  handleSearch = data => {
    data.preventDefault();
    this.props.history.push("/search/" + data.target[0].value);
  };
  render() {
    return (
      <Navbar default collapseOnSelect>
        <Navbar.Header>
          <Navbar.Brand>
            <Image
              className="nav-img d-inline-block align-top"
              src={require("./../img/rp.png")}
              alt="Second slide"
            />
            <Link className="website-name" to="/">
              RelievePoverty
            </Link>
          </Navbar.Brand>
        </Navbar.Header>
        <Navbar className="navbar">
          <Nav pullLeft>
            <NavItem
              eventKey={1}
              className="navitem"
              componentClass={Link}
              href="/"
              to="/"
            >
              Home
            </NavItem>
            <NavItem
              eventKey={2}
              className="navitem"
              componentClass={Link}
              href="/news"
              to="/news"
            >
              News
            </NavItem>
            <NavItem
              eventKey={3}
              className="navitem"
              componentClass={Link}
              href="/charities"
              to="/charities"
            >
              Charities
            </NavItem>
            <NavItem
              eventKey={4}
              className="navitem"
              componentClass={Link}
              href="/states"
              to="/states"
            >
              States
            </NavItem>
            <NavItem
              eventKey={5}
              className="navitem"
              componentClass={Link}
              href="/about"
              to="/about"
            >
              About
            </NavItem>
          </Nav>
          <form onSubmit={this.handleSearch}>
            <input
              className="navbar-search-bar"
              type="text"
              placeholder="Search"
            />
            <input id="search-submit" type="submit" value="Submit" />
          </form>
        </Navbar>
      </Navbar>
    );
  }
}
export default withRouter(CustomNavbar);
