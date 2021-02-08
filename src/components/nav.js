import React from 'react';
import Styled from 'styled-components';
import {Link} from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';

import authContext from '../context/auth-context';
import brandImg from '../assets/logo.png';

const Styles = Styled(Container)`
    background-color: #F8F8FF;

    .nav-item .nav-link {
        color: purple;
        font-weight: 600;
    }

    .btn {
        border: none;
        background: transparent;
    }
`;

const Navigation = () => {

    let {auth, setAuth} = React.useContext(authContext);

    let LogOut = () => {
        localStorage.removeItem('expires');
        localStorage.removeItem('token');
        console.log(auth);
        setAuth(false);
    }

    return (
        <Styles>
            <Navbar expand="lg">
            <Navbar.Brand to="/" as={Link}><img alt="logo" src={brandImg}/></Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-nav"/>
                <Navbar.Collapse id="basic-nav">
                    <Nav className="ml-auto">
                        {auth ?
                            <>
                                <Nav.Item>
                                    <Nav.Link to="/d" as={Link}>DashBoard</Nav.Link>
                                </Nav.Item>
                                <Nav.Item>
                                    <Nav.Link to="/courses" as={Link}>Courses</Nav.Link>
                                </Nav.Item>
                                <Nav.Item>
                                    <Nav.Link to="/upload" as={Link}>Upload</Nav.Link>
                                </Nav.Item>
                                <Nav.Item>
                                    <Nav.Link as={Button} onClick={LogOut}>LogOut</Nav.Link>
                                </Nav.Item>
                            </> 
                            :
                            <>
                                <Nav.Item>
                                    <Nav.Link to="/login" as={Link}>LogIn</Nav.Link>
                                </Nav.Item>
                                <Nav.Item>
                                    <Nav.Link to="/register" as={Link}>Register</Nav.Link>
                                </Nav.Item>
                            </>
                        }
                        <Nav.Item><Nav.Link to="/contact"as={Link}>Contact Us</Nav.Link></Nav.Item>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        </Styles>
    );
}

export default Navigation;