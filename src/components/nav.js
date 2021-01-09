import React from 'react';
import Styled from 'styled-components';
import {Link} from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import brandImg from '../assets/logo.png';

const Styles = Styled(Container)`
    background-color: #F8F8FF;

    .nav-item .nav-link {
        color: purple;
        font-weight: 600;
    }

    .nav-item:hover .nav-link {
        border: 2px solid #696969;
        border-radius: 3px;
        background-color: #696969;
        color: #F8F8FF;
    }
`;

const Navigation = () => {
    return (
        <Styles>
            <Navbar expand="lg">
            <Navbar.Brand><img alt="logo" src={brandImg}/></Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-nav"/>
                <Navbar.Collapse id="basic-nav">
                    <Nav className="ml-auto">
                        <Nav.Item><Nav.Link to="/login" as={Link}>LogIn</Nav.Link></Nav.Item>
                        <Nav.Item><Nav.Link to="/register" as={Link}>Register</Nav.Link></Nav.Item>
                        <Nav.Item><Nav.Link to="/contact"as={Link}>Contact Us</Nav.Link></Nav.Item>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        </Styles>
    );
}

export default Navigation;