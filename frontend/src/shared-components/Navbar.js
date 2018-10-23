import React, { Component } from 'react'
import { Navbar, Nav, NavItem } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './Navbar.css'

class CustomNavbar extends Component {
  render() {
    return (
      <Navbar default collapseOnSelect>
        <Navbar.Header>
          <Navbar.Brand>
            <Link to="/">RelievePoverty</Link>
          </Navbar.Brand>
        </Navbar.Header>
        <Navbar>
          <Nav pullRight>
            <NavItem eventKey={1} className='navitem' componentClass={Link} href="/" to="/">
              Home
            </NavItem>
            <NavItem eventKey={2} className='navitem' componentClass={Link} href="/news" to="/news">
              News
            </NavItem>
            <NavItem eventKey={3} className='navitem' componentClass={Link} href="/charities" to="/charities">
              Charities
            </NavItem>
            <NavItem eventKey={4} className='navitem' componentClass={Link} href="/states" to="/states">
              States
            </NavItem>
            <NavItem eventKey={5} className='navitem' componentClass={Link} href="/about" to="/about">
              About
            </NavItem>
          </Nav>
        </Navbar>
      </Navbar>
  );
  }
}
export default CustomNavbar;