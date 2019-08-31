import React, { Component } from "react";
import {
    MDBNavbar, MDBNavbarBrand, MDBNavbarNav, MDBNavItem, MDBNavLink, MDBNavbarToggler, MDBCollapse } from "mdbreact";

class Header extends Component {

    state = {
        isOpen: false
    };

    toggleCollapse = () => {
        this.setState({ isOpen: !this.state.isOpen });
    }

    render() {
        return (
            <MDBNavbar color="primary-color" dark expand="md">
                <MDBNavbarBrand>
                    <strong className="white-text bold">DirShared</strong>
                </MDBNavbarBrand>
                <MDBNavbarToggler onClick={this.toggleCollapse}><span className="align-middle mr-1">Menu</span><span className="navbar-toggler-icon"></span></MDBNavbarToggler>
                <MDBCollapse id="navbarCollapse" isOpen={this.state.isOpen} navbar>
                    <MDBNavbarNav left>
                        <MDBNavItem>
                            <MDBNavLink to="/">Home</MDBNavLink>
                        </MDBNavItem>
                        <MDBNavItem>
                            <MDBNavLink to="/about">About</MDBNavLink>
                        </MDBNavItem>
                    </MDBNavbarNav>
                </MDBCollapse>
            </MDBNavbar>
        );
    }
  }
  
  export default Header;