import React from 'react';
import Styled from 'styled-components';

const Styles = Styled.footer`
    display: flex;
    justify-content: center;
    width: 100%;
    background-color: #696969;
    height: 100px;
    padding: 10px;
    color: white;
`;

const Footer = () => {

    let date = new Date().getFullYear();

    return (
        <Styles>
            &copy;Copyright Estudiar {date} 
        </Styles>
    );
}

export default Footer;