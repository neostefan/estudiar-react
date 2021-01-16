import React from 'react';
import Styled from 'styled-components';
import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';
import Button from '../components/button';
import img from '../assets/bg-jumbo.jpg';
import {engineering_depts, science_depts, faculties, years} from '../util/gen-util';

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
        default: return state
    }
}

const Register = () => {

    let [state, dispatch] = React.useReducer(Reducer, {
        email: "",
        password: "",
        faculty: "Engineering",
        dept: "",
        year: 1
    });

    let handleChange = e => dispatch({type: "INPUT_CHANGE", input: e.target.name, value: e.target.value});

    let checkFaculty = () => {
        if(state.faculty === "Engineering") {
            return engineering_depts.map(dept => (
                <option value={dept}>{dept}</option>
            ))
        }

        if(state.faculty === "Science") {
            return science_depts.map(dept => (
                <option value={dept}>{dept}</option>
            ))
        }
    }

    let handleSubmit = () => {

    }

    return (
        <Styles>
            <div className="tint"/>
            <div className="register">
                <Card>
                    <Card.Body>
                        <Form>
                            <Form.Group>
                                <Form.Label>E-mail</Form.Label>
                                <Form.Control
                                    type="email"
                                    placeholder="Enter a valid e-mail"
                                    name="email"
                                    value={state.email}
                                    onChange={handleChange}
                                    />
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
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Faculty</Form.Label>
                                <Form.Control
                                    as="select"
                                    name="faculty"
                                    onChange={handleChange}
                                    >
                                    {faculties.map(opt => (
                                        <option value={opt}>{opt}</option>
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
                                        <option value={yr}>{yr}</option>
                                    ))}
                                </Form.Control>
                            </Form.Group>
                            <Button
                            className="cBtn" 
                            text="Register" 
                            click={() => handleSubmit()} 
                            type="submit"/>
                        </Form>
                    </Card.Body>
                </Card>
            </div>
        </Styles>        
    );
}

export default Register;