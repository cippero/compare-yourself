import React, { Component } from 'react';
import { Form, Button, Header } from 'semantic-ui-react';
import { Auth } from 'aws-amplify';
import { Link } from "react-router-dom";
import styled from 'styled-components';
import axios from 'axios';

const StyledForm = styled(Form)`
    background-color: ${props => props.theme.primaryColor};
    padding: ${props => props.theme.spacing};
    border-radius: ${props => props.theme.borderRadius};
    box-shadow: ${props => props.theme.shadow};
`;

const StyledButton = styled.div`
    display: flex;
    justify-content: center;
    margin-top: ${props => props.theme.spacing};
`;

export default class Compare extends Component {
    constructor(props) {
        super(props);
        this.state = {
            status: 'Submit'
            ,isLoading: {}
            ,age: null
            ,height: null
            ,income: null
        };
    }

    handleChange = e => this.setState({ [e.target.id]: e.target.value});

    handleSubmit = async e => {
        e.preventDefault();
        let isLoading = this.state.isLoading;
        isLoading.loading = true;
        this.setState({ status: 'Submitting...', isLoading: isLoading });
        try {
            const user = await Auth.currentSession();
            // console.log(user.idToken.jwtToken);
            const data = {
                age: +this.state.age
                ,height: +this.state.height
                ,income: +this.state.income
            };
            console.log(data);
            const response = await axios({
                method: 'POST', 
                url: 'https://38oovlytec.execute-api.us-west-2.amazonaws.com/dev/compare-yourself', 
                headers:   {'Content-Type': 'application/json', 
                            'Authorization': user.idToken.jwtToken}, 
                data: JSON.stringify(data)
            });
            console.log(response);
        } catch (e) {
            alert(e.message);
            console.log(e);
        }
    }

    async getAll() {
        try {
            const user = await Auth.currentSession();
            const response = await axios({
                method: 'GET'
                ,url: 'https://38oovlytec.execute-api.us-west-2.amazonaws.com/dev/compare-yourself/all'
                ,headers:   {'Content-Type': 'application/json',
                            'Authorization': user.idToken.jwtToken}
            });
            console.log(response);
        } catch (e) {
            alert(e.message);
            console.log(e);
        }
    }

    validateForm() {
        return  this.state.age > 0    &&
                this.state.height > 0 &&
                this.state.income > 0
    }

    render() {
        return (
            <div>
                <StyledForm {...this.state.isLoading} onSubmit={this.handleSubmit}>
                    <Header as='h2'>Set Your Data</Header>
                    <Form.Field>
                        <label>Age</label>
                        <input  placeholder='age'
                                type='tel'
                                id="age"
                                onChange={this.handleChange}
                                required
                                autoFocus />
                    </Form.Field>
                    <Form.Field>
                        <label>Height (Inches)</label>
                        <input  placeholder='height' 
                                type='tel' 
                                id="height"
                                onChange={this.handleChange}
                                required />
                    </Form.Field>
                    <Form.Field>
                        <label>Monthly Income (USD)</label>
                        <input  placeholder='income' 
                                type='tel' 
                                id="income"
                                onChange={this.handleChange}
                                required />
                    </Form.Field>
                    <StyledButton>
                        <Button type='submit' disabled={!this.validateForm() || this.state.status !== 'Submit'}>
                            {this.state.status}
                        </Button>
                    </StyledButton>
                </StyledForm>
                <StyledButton>
                    <Button as={Link} to='/compare/all'>View All</Button>
                </StyledButton>
            </div>
        )
    }
}