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

export default class CompareAll extends Component {
    constructor(props) {
        super(props);
        this.state = {
            entries: []
        };
    }

    async componentDidMount() {
        try {
            const user = await Auth.currentSession();
            const queryParam = `?accessToken=${user.accessToken.jwtToken}`;
            const response = await axios({
                method: 'GET'
                ,url: 'https://38oovlytec.execute-api.us-west-2.amazonaws.com/dev/compare-yourself/all' + queryParam
                ,headers:   {'Content-Type': 'application/json',
                            'Authorization': user.idToken.jwtToken}
            });
            this.setState({entries: response.data});
        } catch (e) {
            alert(e.message);
            console.log(e);
        }
    }

    render() {
        const entries = this.state.entries.map((entry, i) => {
            return (
                <Card key={i}>
                    <Card.Content as={Link} to={{ pathname: '/compare/single', entry: entry }}>
                        <Card.Header>Entry {i}</Card.Header>
                        <List>
                            <List.Item>
                                <List.Header>Age</List.Header>
                                {entry.age}
                            </List.Item>
                            <List.Item>
                                <List.Header>Height</List.Header>
                                {entry.height}
                            </List.Item>
                            <List.Item>
                                <List.Header>Income</List.Header>
                                {entry.income}
                            </List.Item>
                        </List>
                    </Card.Content>
                </Card>
            )
        });
        
        return (
            <div>
                {this.state.entries.length > 0 ?
                    <Card.Group>
                        {entries}
                    </Card.Group>
                : <p>No entries in database :(</p>}
            </div>
            
        )
    }
}