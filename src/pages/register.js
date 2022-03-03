import React from 'react';
import Styled from 'styled-components';
import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';
import Alert from 'react-bootstrap/Alert';

import Button from '../components/button';
import img from '../assets/bg-jumbo.jpg';
import axios from '../axios-inst';
import {
    engineering_depts, 
    science_depts, 
    faculties, 
    years,
    checkErrorItem
} from '../util/gen-util';
import {emailSanitization, passwordSanitization} from '../util/sanitize-util';
import {checkServerErrorType} from '../util/err-util';

const Styles = Styled.div`
    display: grid;
    background-image: url(${img});
    background-size: cover;
    width: 100%;
    height: 600px;
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

    .register {
        grid-column: 2/4;
        justify-self: center;
        align-self: center;
    }

    .register .card {
        width: 300px;
        height: auto;
    }

    .register .card form {
        display: grid;
        color: orchid;
    }

    .card-body button {
        justify-self: center;
    }
`;

const Reducer = (state, action) => {
    switch (action.type) {
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
        case "SUBMITTING":
            return {
                ...state,
                loading: true
            }
        case "SUBMITTED":
            return {
                ...state,
                loading: false,
                msg: action.msg,
                show: true,
                msgType: action.msgType
            }
        case "MSG_SEEN":
            return {
                ...state,
                show: false
            }
        case "RESET":
            return {
                ...state,
                email: '',
                password: '',
                errors: []
            }
        default: return state
    }
}

const Register = () => {

    let [state, dispatch] = React.useReducer(Reducer, {
        name: "",
        email: "",
        password: "",
        faculty: "Engineering",
        dept: "",
        year: 1,
        errors: [],
        show: false,
        msg: '',
        msgType: ''
    });

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

    let checkFaculty = () => {
        if(state.faculty === "Engineering") {
            return engineering_depts.map((dept, i) => {
                if(i === 0) {
                    return (<option key={dept} value={dept} selected>{dept}</option>)
                }
                
                return (<option key={dept} value={dept}>{dept}</option>);
            });
        }

        if(state.faculty === "Science") {
            return science_depts.map((dept, i) => {
                if(i === 0) {
                    return (<option key={dept} value={dept} selected>{dept}</option>)
                }
                
                return (<option key={dept} value={dept}>{dept}</option>);
            });
        }
    }

    let checkForErrors = type => {
        if(state.errors.length > 0) {
            console.log(state.errors);
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

    let handleSubmit = async e => {
        e.preventDefault();
        dispatch({type: "SUBMITTING"});
        try {
            let fd = new FormData();
            fd.append('name', state.name)
            fd.append('email', state.email);
            fd.append('password', state.password);
            fd.append('faculty', state.faculty);
            fd.append('dept', state.dept);
            fd.append('year', state.year);
            let res = await axios.post('/auth/register', fd);
            dispatch({type: "SUBMITTED", msg: res.data, msgType: 'notif'});
        } catch(e) {
            let error = checkServerErrorType(e);
            dispatch({type: "SUBMITTED", msg: error, msgType: 'err'});
        }

        dispatch({type: "RESET"});
    }

    return (
        <Styles>
            <div className="tint"/>
            <div className="register">
                <Card>
                    <Card.Body>
                        {state.msg ? 
                            <Alert 
                                show={state.show} 
                                variant={(state.msgType !== 'err') ? 'success' : 'danger'}
                                dismissible
                                onClose={() => dispatch({type: "MSG_SEEN"})}
                            >
                                {state.msg}
                            </Alert> : null
                        }
                        <Form onSubmit={handleSubmit}>
                        <Form.Group>
                                <Form.Label>First Name</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Enter your first name"
                                    name="name"
                                    value={state.name}
                                    onChange={handleChange}
                                    />
                                {checkForErrors('name') ? 
                                    <Form.Text style={{color: "red"}}>
                                        {checkForErrors('name')}
                                    </Form.Text> : null
                                }
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>E-mail</Form.Label>
                                <Form.Control
                                    type="email"
                                    placeholder="Enter a valid e-mail"
                                    name="email"
                                    value={state.email}
                                    onChange={handleChange}
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
                                    placeholder="Create your password"
                                    name="password"
                                    value={state.password}
                                    onChange={handleChange}
                                    />
                                {checkForErrors('password') ? 
                                    <Form.Text style={{color: "red"}}>
                                        {checkForErrors('password')}
                                    </Form.Text> : null
                                }
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Faculty</Form.Label>
                                <Form.Control
                                    as="select"
                                    name="faculty"
                                    onChange={handleChange}
                                    >
                                    {faculties.map(opt => (
                                        <option key={opt} value={opt}>{opt}</option>
                                    ))}
                                </Form.Control>
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Department</Form.Label>
                                <Form.Control 
                                    as="select" 
                                    name="dept"
                                    onChange={handleChange}
                                >
                                    {checkFaculty()}
                                </Form.Control>
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Year</Form.Label>
                                <Form.Control
                                    as="select"
                                    name="year"
                                    onChange={handleChange}
                                >
                                    {years.map(yr => (
                                        <option key={yr} value={yr}>{yr}</option>
                                    ))}
                                </Form.Control>
                            </Form.Group>
                            <Button
                            text="Register"  
                            type="submit"/>
                        </Form>
                    </Card.Body>
                </Card>
            </div>
        </Styles>        
    );
}

export default Register;