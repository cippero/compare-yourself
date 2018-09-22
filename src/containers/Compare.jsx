import React, { Component } from 'react';
import { Form, Button, Header } from 'semantic-ui-react';
import styled from 'styled-components';

const StyledForm = styled(Form)`
    background-color: ${props => props.theme.primaryColor};
    padding: 5vh;
    border-radius: 5px;
    border: solid black;
`;

const StyledButton = styled(Button)`
    text-align: center;
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

    handleSubmit = e => {
        e.preventDefault();
        let isLoading = this.state.isLoading;
        isLoading.loading = true;
        this.setState({ status: 'Submitting...', isLoading: isLoading });
    }

    validateForm() {
        return  this.state.age > 0    &&
                this.state.height > 0 &&
                this.state.income > 0
    }

    render() {
        return (
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
                <Form.Field>
                    <StyledButton type='submit' disabled={!this.validateForm() || this.state.status !== 'Submit'}>
                        {this.state.status}
                    </StyledButton>
                </Form.Field>
            </StyledForm>
        )
    }
}