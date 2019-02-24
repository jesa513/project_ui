import React, { Component } from 'react';
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
    UncontrolledDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem } from 'reactstrap';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Cookies from 'universal-cookie';
import { onUserSignout } from '../actions';

const cookies = new Cookies();

class Header extends Component {
    constructor(props) {
        super(props);
    
        this.toggle = this.toggle.bind(this);
        this.state = {
          isOpen: false
        };
    }
    toggle() {
        this.setState({
            isOpen: !this.state.isOpen
        });
    }

    onLogOutSelect = () => {
        this.props.onUserSignout();
        cookies.remove('Ferguso');
    }

    render() {
        if(this.props.username === "") {
            return (
                <div>
                    <Navbar color="light" light expand="md">
                    <NavbarBrand href="/">{this.props.navBrand}</NavbarBrand>
                    <NavbarToggler onClick={this.toggle} />
                    <Collapse isOpen={this.state.isOpen} navbar>
                        <Nav className="ml-auto" navbar>
                            <NavItem>
                                <Link to="/"><NavLink>Home</NavLink></Link>
                            </NavItem>
                            <NavItem>
                                <Link to="/product"><NavLink>Product</NavLink></Link>
                            </NavItem>
                            <NavItem>
                                <Link to="/register"><NavLink>Register</NavLink></Link>
                            </NavItem>
                            <NavItem>
                                <Link to="/signin"><NavLink>Sign In</NavLink></Link>
                            </NavItem>
                        </Nav>
                    </Collapse>
                    </Navbar>
                </div>
            )
        }
        
        return (

              <div>
                <Navbar color="light" light expand="md">
                <NavbarBrand href="/">{this.props.navBrand}</NavbarBrand>
                <NavbarToggler onClick={this.toggle} />
                <Collapse isOpen={this.state.isOpen} navbar>
                    <Nav className="ml-auto" navbar>
                        <NavItem>
                            <NavLink href="/">Home</NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink href="/equipment">Equipment</NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink href="/hardware">Hardware</NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink href="/stationary">Stationary</NavLink>
                        </NavItem>
                        <UncontrolledDropdown nav inNavbar>
                            <DropdownToggle nav caret>
                                Hello, {this.props.username}
                            </DropdownToggle>
                            <DropdownMenu right>
                                <DropdownItem>
                                    <Link to="/cart">Cart</Link>
                                </DropdownItem>
                                <DropdownItem>
                                    <Link to="/history">History</Link>
                                </DropdownItem>
                                <DropdownItem divider />
                                <DropdownItem onClick={this.onLogOutSelect}>
                                    Logout
                                </DropdownItem>
                            </DropdownMenu>
                        </UncontrolledDropdown>
                    </Nav>
                </Collapse>
                </Navbar>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return { username: state.auth.username }
}

export default connect(mapStateToProps, { onUserSignout })(Header);

// var objKucing = { kurcaci: 'Hello', bertasbih: { nyingnyong: 'Teletubies'} }

// console.log(objKucing.bertasbih.nyingnyong)

// var { nyingnyong } = objKucing.bertasbih;

// console.log(nyingnyong);