import React, { Component } from 'react';
import styled from 'styled-components';

const StyledFooter = styled.div`
    background-color: #e3f3ff;
    /* height: 10vh; */
    position: fixed;
    bottom: 0;
    margin-top: 10vh;
    padding: 5vh 2vh;
    width: 100%;
    text-align: center;
`;

const StyledP = styled.p`
    /* justify-content: center;
    align-items: center; */
`;

export default class Footer extends Component {
    render() {
        return (
            <StyledFooter>
                <StyledP>This is the footer</StyledP>
            </StyledFooter>
        );
    }
}
