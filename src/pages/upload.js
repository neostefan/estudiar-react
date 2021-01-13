import React from 'react';
import Styled from 'styled-components';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';

import Button from '../components/button'; 

const Styles = Styled.div`
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    
    form {
        grid-column: 1/5;
        justify-self: center;
    }

    @media screen and (max-width: 650px) {
        padding: 10px;
    }
`;

const Reducer = (state, action) => {
    switch (action.type) {
        case "FILE_UPLOAD":
            return {
                ...state,
                material: action.file
            }
        case "INPUT_CHANGE":
            return {
                ...state,
                [action.input]: action.value
            }
        default: return state
    }
}

const Upload = () => {
    let [state, dispatch] = React.useReducer(Reducer, {
        faculty: "Engineering",
        dept: "",
        year: 1,
        material: null
    });

    let options_faculty = [
        "Engineering",
        "Science"
    ];

    let checkFaculty = () => {
        let engineering_depts = [
            "Systems",
            "Electrical",
            "Mechanical",
            "Chemical",
            "Petrochemical",
            "Biomedical",
            "Surveying"
        ];

        let science_depts = [
            "Geology",
            "Pharmacy",
            "Marine Biology",
            "Zoology"
        ]

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

    let handleFileInput = e => dispatch({type: "FILE_UPLOAD", file: e.target.files[0]});

    let handleChange = e => dispatch({type: "INPUT_CHANGE", input: e.target.name, value: e.target.value});

    return (
        <Styles>
            <Form>
                <Form.Row>
                    <Col>
                        <Form.Group>
                            <Form.Label>Faculty</Form.Label>
                            <Form.Control
                                as="select"
                                name="faculty"
                                onChange={handleChange}
                            >
                                {options_faculty.map(fac => (
                                    <option value={fac}>{fac}</option>
                                ))}
                            </Form.Control>
                        </Form.Group>
                    </Col>
                    <Col>
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
                    </Col>
                </Form.Row>
                <Form.Group>
                    <Form.Label>Year</Form.Label>
                    <Form.Control
                        as="select"
                        name="year"
                        onChange={handleChange}
                    >
                        <option value={1}>1</option>
                        <option value={2}>2</option>
                        <option value={3}>3</option>
                        <option value={4}>4</option>
                        <option value={5}>5</option>
                    </Form.Control>
                </Form.Group>
                <Form.Group>
                    <Form.Label>Material</Form.Label>
                    <Form.File 
                        accept=".jpg .pdf .png .doc"
                        onChange={handleFileInput}
                    />
                </Form.Group>
                <Button type="submit" text="Upload"/>
            </Form>
        </Styles>
    );
}

export default Upload;
