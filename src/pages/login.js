import React from 'react';
import Styled from 'styled-components';
import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';
import Button from '../components/button';
import img from '../assets/bg-jumbo.jpg';

import {emailSanitization, passwordSanitization} from '../util/sanitize-util';
import {checkErrorItem} from '../util/gen-util';

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

    .login .card form button {
        justify-self: center;
    }
`;

const Reducer = (state, action) => {
    switch(action.type) {
        case "INPUT_CHANGE":
            return {
                ...state,
                [action.input]: action.value
            }
        case "ERROR_OCCURRED":
            return {
                ...state,
                errors: [...state.errors, {type: action.errType, msg: action.msg}]
            }
        case "ERROR_RESOLVED":
            return {
                ...state,
                errors: state.errors.map(item => ((item.type === action.errType) ? {type: '', msg: ''} : item))
            }
        case "RESET":
            return {
                ...state,
                email: '',
                password: '',
                errors: []
            }
        default: return state;
    }
}

const LogIn = () => {
    let [state, dispatch] = React.useReducer(Reducer, {email: "", password: "", errors: []});

    let handleChange = e => {
        dispatch({type: "INPUT_CHANGE", input: e.target.name, value: e.target.value});

        if(e.target.name === "email") {
            let output = emailSanitization(e.target.value);
            if(output.status) {
                let errType = "email";
                dispatch({type: "ERROR_RESOLVED", errType});
            } else {
                dispatch({type: "ERROR_OCCURRED", msg: output.msg, errType: 'email'});
            }
        }
        
        if(e.target.name === "password") {
            let status = passwordSanitization(e.target.value);
            if(status) {
                let errType = "password";
                dispatch({type: "ERROR_RESOLVED", errType});
            } else {
                let msg = "password min length is 7 and must contain numbers";
                dispatch({type: "ERROR_OCCURRED", msg, errType: 'password'});   
            }
        }
    }

    let checkForErrors = type => {
        if(state.errors.length > 0) {
            let error = checkErrorItem(state.errors, type);
            if(error !== undefined) {
                return error.msg;
            } else {
                return false;
            }
        } else {
            return false;
        }
        
    }
    
    let handleSubmit = e => {
        e.preventDefault();
        dispatch({type: "RESET"});
    }

    return (
        <Styles>
            <div className="tint"/>
            <div className="login">
                <Card>
                    <Card.Body>
                        <Form onSubmit={handleSubmit}>
                            <Form.Group>
                                <Form.Label>E-mail</Form.Label>
                                <Form.Control
                                    type="email"
                                    name="email"
                                    onChange={handleChange}
                                    value={state.email}
                                    placeholder="Enter your e-mail"
                                />
                                {checkForErrors('email') ? 
                                    <Form.Text style={{color: "red"}}>
                                        {checkForErrors('email')}
                                    </Form.Text> : null
                                }
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Password</Form.Label>
                                <Form.Control
                                    type="password"
                                    name="password"
                                    onChange={handleChange}
                                    value={state.password}
                                    placeholder="Enter your password"
                                />
                                {checkForErrors('password') ? 
                                    <Form.Text style={{color: "red"}}>
                                        {checkForErrors('password')}
                                    </Form.Text> : null
                                }
                            </Form.Group>
                            <Button 
                            text="Login" 
                            type="submit"/>
                        </Form>
                    </Card.Body>
                </Card>
            </div>
        </Styles>        
    );
}

export default LogIn;