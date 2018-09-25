import React, { Component } from 'react';
import { List, Button, Container, Header } from 'semantic-ui-react';
import { Auth } from 'aws-amplify';
import { Link } from "react-router-dom";
import axios from 'axios';
import styled from 'styled-components';

const StyledButton = styled.div`
    display: flex;
    justify-content: center;
    margin-top: ${props => props.theme.spacing};
`;

const StyledContainer = styled(Container)`
    background-color: ${props => props.theme.primaryColor};
    padding: ${props => props.theme.spacing};
    border-radius: ${props => props.theme.borderRadius};
    box-shadow: ${props => props.theme.shadow};
`;

export default class CompareSingle extends Component {
    constructor(props) {
        super(props);
        this.state = {
            age: null
            ,height: null
            ,income: null
            ,user: null
        }
    }

    async getInfo() {
        try {
            const user = await Auth.currentSession();
            // console.log(user);
            const queryParam = `?accessToken=${user.accessToken.jwtToken}`;
            const response = await axios({
                method: 'GET'
                ,url: 'https://38oovlytec.execute-api.us-west-2.amazonaws.com/dev/compare-yourself/single' + queryParam
                ,headers: {'Content-Type': 'application/json',
                            'Authorization': user.idToken.jwtToken}
            });
            // console.log(response);
            this.setState({ age: response.data[0].age
                            ,height: response.data[0].height
                            ,income: response.data[0].income
                            ,user: true})
        } catch (e) {
            alert(e.message);
            console.log(e);
        }
    }

    handleDelete = async () => {
        const user = await Auth.currentSession();
        const queryParam = `?accessToken=${user.accessToken.jwtToken}`;
        axios({
            method: 'DELETE'
            ,url: 'https://38oovlytec.execute-api.us-west-2.amazonaws.com/dev/compare-yourself' + queryParam
            ,headers: {'Content-Type': 'application/json',
                        'Authorization': user.idToken.jwtToken}
        });
        // console.log(response);
        this.props.history.push("/compare");
    }

    componentDidMount() {
        this.props.location.entry
        ? this.setState({ age: this.props.location.entry.age
                        ,height: this.props.location.entry.height
                        ,income: this.props.location.entry.income})
        : this.getInfo();
    }
    render() {
        let current = '';
        if (this.state.user) {
            current = 
            <StyledButton>
                <Button onClick={this.handleDelete}>Delete</Button>
            </StyledButton>;
        }
        return (
            <div>
                {this.state.age && this.state.height && this.state.income
                ? <StyledContainer text>
                    <Header as='h2'>Entry #</Header>
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
                        {current}
                    </List>
                </StyledContainer>
                : <p>No data</p>}
                <StyledButton>
                    <Button as={Link} to='/compare/all'>View All</Button>
                </StyledButton>
            </div>
        )
    }
}