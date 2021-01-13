import React from 'react';
import Styled from 'styled-components';
import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';
import Button from '../components/button';
import img from '../assets/bg-jumbo.jpg';

const Styles = Styled.div`
    display: grid;
    background-image: url(${img});
    width: 100%;
    height: 480px;
    position: relative;
    grid-template-columns: repeat(4, 1fr);

    .tint {
        position: absolute;
        top: 0;
        left: 0;
        background-color: purple;
        opacity: 0.2;
        width: 100%;
        height: 100%;
    }

    .login {
        grid-column: 2/4;
        justify-self: center;
        align-self: center;
    }

    .login .card {
        width: 300px;
        height: auto;
    }

    .login .card form {
        display: grid;
        color: orchid;
    }

    .login .card form button.cBtn {
        justify-self: center;
    }
`;

const LogIn = () => {

    let handleSubmit = () => {

    }

    return (
        <Styles>
            <div className="tint"/>
            <div className="login">
                <Card>
                    <Card.Body>
                        <Form>
                            <Form.Group>
                                <Form.Label>E-mail</Form.Label>
                                <Form.Control
                                    type="email"
                                    placeholder="Enter your e-mail"
                                />
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Password</Form.Label>
                                <Form.Control
                                    type="password"
                                    placeholder="Enter your password"
                                />
                            </Form.Group>
                            <Button
                            className="cBtn" 
                            text="Login" 
                            click={() => handleSubmit()} 
                            type="submit"/>
                        </Form>
                    </Card.Body>
                </Card>
            </div>
        </Styles>        
    );
}

export default LogIn;