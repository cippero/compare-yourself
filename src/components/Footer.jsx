import React, { Component } from 'react';
import styled from 'styled-components';

const StyledFooter = styled.div`
    background-color: #5c5f6c;
    display: flex;
    align-items: center;
    justify-content: center;
    position: fixed;
    bottom: 0;
    margin-top: 10vh;
    padding: 5vh 2vh;
    width: 100%;
    box-shadow: 0px -1px 4px 2px #545454;
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
