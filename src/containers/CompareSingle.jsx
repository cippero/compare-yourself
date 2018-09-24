import React, { Component } from 'react';
import { Card, List } from 'semantic-ui-react';
import { Auth } from 'aws-amplify';
import { Link } from "react-router-dom";
import axios from 'axios';
// import styled from 'styled-components';

// const StyledCards = styled.div`
//     background-color: gray;
//     box-shadow: ${props => props.theme.shadow};
// `;

export default class CompareSingle extends Component {
    constructor(props) {
        super(props);
        this.state = {
            age: null
            ,height: null
            ,income: null
        }
    }

    componentDidMount() {
        this.setState({ age: this.props.location.entry.age, height: this.props.location.entry.height, income: this.props.location.entry.income});
    }
    render() {
        return (
            <Card>
                <Card.Content>
                    <Card.Header>Entry #</Card.Header>
                    <List>
                        <List.Item>
                            <List.Header>Age</List.Header>
                            {this.state.age}
                        </List.Item>
                        <List.Item>
                            <List.Header>Height</List.Header>
                            {this.state.height}
                        </List.Item>
                        <List.Item>
                            <List.Header>Income</List.Header>
                            {this.state.income}
                        </List.Item>
                    </List>
                </Card.Content>
            </Card>
        )
    }
}