import React from 'react';
import Styled from 'styled-components';

import Button from '../components/button';
import {engineering_depts, science_depts, faculties, years} from '../util/gen-util';

const Styles = Styled.div`
    width: 100%;
    padding: 10px;
    display: flex;
    justify-content: center;

    .grid {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        grid-auto-rows: minmax(15px, auto);
        flex-basis: 350px;
        margin: 0;
        border: 1px solid #696969;
        border-radius: 10px;
        box-shadow: 2px 2px 3px #696969;
        gap: 10px;
        padding: 10px;
    }

    .grid .title {
        grid-column: 1/4;
        justify-self: center;
        color: orchid;
        font-weight: 700;
        font-size: large;
    }

    .grid button {
        grid-column: 1/4;
        justify-self: center;
    }

    .grid-item {
        grid-column: 1/4;
        justify-self: center;
        display: grid;
        grid-template-columns: repeat(3, 1fr);
    }

    .grid-item div {
        grid-column: 1/2;
        justify-self: center;
        color: orchid;
    }

    .grid-item input, .grid-item select {
        grid-column: 2/4;
        justify-self: center;
        min-width: 182px;
    }
`;

const Reducer = (state, action) => {
    switch (action.type) {
        case "CHANGING_INPUT":
            return {
                ...state,
                [action.input]: action.value
            }
        case "ENABLE_EDITING":
            return {
                ...state,
                editing: true
            }
        case "DISABLE_EDITING":
            return {
                ...state,
                editing: false
            }
        default: return state
    }
}

const Profile = () => {
    let [state, dispatch] = React.useReducer(Reducer, {
        name: "testUser",
        email: "test@test.com",
        password: "wanker",
        faculty: "Engineering",
        dept: "",
        year: 4,
        editing: false
    });

    let checkFaculty = () => {
        if(state.faculty === "Engineering") {
            return engineering_depts.map(dept => (
                <option key={dept} value={dept}>{dept}</option>
            ))
        }

        if(state.faculty === "Science") {
            return science_depts.map(dept => (
                <option key={dept} value={dept}>{dept}</option>
            ))
        }
    }

    let handleChange= e => dispatch({type: "CHANGING_INPUT", input: e.target.name, value: e.target.value}); 

    let editHandler = e =>  {
        e.preventDefault(); 
        dispatch({type: "ENABLE_EDITING"});
    }

    let submitHandler = e => {
        e.preventDefault();
        dispatch({type: "DISABLE_EDITING"});
    }

    return (
        <Styles>
            <form className="grid" onSubmit={submitHandler}>
                <div className="title">Profile</div>
                <div className="grid-item">
                    <div>Name</div>
                    <input
                        type="text"
                        name="name"
                        value={state.name}
                        onChange={handleChange}
                        disabled={state.editing ? false : true}
                    />
                </div>
                <div className="grid-item">
                    <div>E-mail</div>
                    <input
                        name="email"
                        type="email"
                        value={state.email}
                        onChange={handleChange}
                        disabled={state.editing ? false : true}
                    />
                </div>
                <div className="grid-item">
                    <div>Password</div>
                    <input
                        name="password"
                        value={state.password}
                        disabled={state.editing ? false : true}
                        type="password"
                        onChange={handleChange}
                    />
                </div>
                <div className="grid-item">
                    <div>Faculty</div>
                    <select
                        name="faculty"
                        onChange={handleChange}
                        disabled={state.editing ? false : true}
                        value={state.faculty}
                    >
                        {faculties.map(fac => (
                            <option 
                                value={fac}
                            >
                                {fac}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="grid-item">
                    <div>Department</div>
                    <select
                        name="dept"
                        onChange={handleChange}
                        disabled={state.editing ? false : true}
                    >
                        {checkFaculty()}
                    </select>
                </div>
                <div className="grid-item">
                    <div>Year</div>
                    <select
                        name="year"
                        onChange={handleChange}
                        disabled={state.editing ? false : true}
                        value={state.yr}
                    >
                        {years.map(yr => (
                            <option
                                key={yr}
                                value={yr}
                            >
                                {yr}
                            </option>
                        ))}
                    </select>
                </div>
                { state.editing ? 
                    (<Button text="Submit" type="submit"/>) : 
                    (<Button click={editHandler} text="Edit" type="button"/>)
                }
            </form>
        </Styles>
    );
}

export default Profile;