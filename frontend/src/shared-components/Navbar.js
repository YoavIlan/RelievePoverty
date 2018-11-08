import React, { Component } from 'react'
import { Navbar, Nav, NavItem, Image } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { Input } from 'semantic-ui-react';
import './Navbar.css';

class CustomNavbar extends Component {
  render() {
    return (
      <Navbar default collapseOnSelect>
        <Navbar.Header>
          <Navbar.Brand>
              <Image className="nav-img d-inline-block align-top" src={require('./../img/rp.png')} alt="Second slide"/>
              <Link className="website-name"to="/">RelievePoverty</Link>
          </Navbar.Brand>
        </Navbar.Header>
        <Navbar className= "navbar">
          <Nav pullLeft>
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
          <Input className="search-bar" placeholder="Search" icon='search'></Input>
        </Navbar>
      </Navbar>
  );
  }
}
export default CustomNavbar;