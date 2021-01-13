import React from 'react';
import Styled from 'styled-components';

const Styles = Styled.div`
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    width: 100%;
    grid-auto-rows: minmax(50px, auto);
    align-content: center;
    min-height: 400px;

    .course {
        width: 70%;
        grid-column: 1/5;
        justify-self: center;
        border: 1px solid orchid;
        color: orchid;
        display: grid;
        grid-template-columns: repeat(7, 1fr);
    }

    .course img {
        grid-column: 2/3;
        justify-self: center;
        align-self: center;
    }

    .course .title {
        grid-column: 3/8;
        justify-self: center;
        align-self: center;
    }
`;

const Courses = () => {
    return (
        <Styles>
            {testCourses.map(course => (
                <div className="course">
                    <img alt="img"/>
                    <div className="title">{course}</div>
                </div>
            ))}
        </Styles>
    )
}

let testCourses = [
    "GEG311",
    "SSG312",
    "MEG115",
    "CEG401",
    "SVY301",
    "ECN501"
]

export default Courses;