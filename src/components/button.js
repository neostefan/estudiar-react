import React from 'react';
import Styled from 'styled-components';

const Styles = Styled.button`
    width: 120px;
    height: 35px;
    text-align: center;
    background-color: orchid;
    color: white;
    border: 2px solid orchid;
    box-shadow: 3px 3px 2px grey;
    border-radius: 5px;
    font-weight: 500;

    &:hover {
        background-color: white;
        color: orchid;
    }
`;

const Button = ({click, type, text}) => <Styles type={type} onClick={click}>{text}</Styles>;

export default Button;