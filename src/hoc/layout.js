import React from 'react';
import Styled from 'styled-components';

const Styles = Styled.div`
    min-height: calc(100vh - 100px);
    margin: 0;
`; 

const Layout = ({children}) => (
    <Styles>
        {children}
    </Styles>
);

export default Layout;