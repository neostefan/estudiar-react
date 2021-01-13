import React from 'react';
import Styled from 'styled-components';

const Styles = Styled.div`
    display: flex;
    width: 100%;
    flex-wrap: wrap;
    justify-content: space-around;
    margin: 10px 0;

    .mat-container {
        width: 200px;
        min-height: 150px;
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        grid-template-rows: repeat(3, 1fr);
        gap: 10px;
    }

    .mat-container img {
        grid-column: 1/4;
        grid-row: 1/3;
    }

    .mat-container .name {
        grid-column: 1/4;
        grid-row: 3/4;
        color: purple;
        font-size: small;
        font-weight: 800;
    }
`;

//The div with the name class should be a link from react router to the material stream
const Materials = () => {
    return (
        <Styles>
            {testMaterials.map(mat => (
                <div className="mat-container">
                    <img alt="img"/>
                    <div className="name">{mat}</div>
                </div>
            ))}
        </Styles>
    )
}

let testMaterials = [
    "Thermodynamics the ins and outs",
    "Fluid Mechanics by some guy called banber",
    "Advanced Engineering Maths",
    "Arduino for nerds and geeks",
    "C# fundamentals by Prof Michael",
    "Fourier Analysis for lazy students by Dr Richard",
    "Data Science and ML with python daddy Eni money",
    "How to code like a boss by Tomjoe Tech",
    "C# advanced by microsoft specialist Prof Benard"
]

export default Materials;