import React, { Component } from 'react';
import { Button, Form, Header } from 'semantic-ui-react';
import { Auth } from 'aws-amplify';
import styled from 'styled-components';

const StyledForm = styled(Form)`
    background-color: ${props => props.theme.primaryColor};
    padding: 5vh;
    border-radius: 5px;
    border: solid black;
`;

export default class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            status: 'Login'
            ,isLoading: {}
            ,username: ''
            ,password: ''
        };
    }

    handleChange = e => {
        this.setState({ [e.target.id]: e.target.value });
        this.validateForm();
    }

    handleSubmit = async e => {
        e.preventDefault();
        let isLoading = this.state.isLoading;
        isLoading.loading = true;
        this.setState({ status: 'Logging in...', isLoading: isLoading });
        try {
            await Auth.signIn(this.state.username, this.state.password);
            this.props.userHasAuthenticated(true);
            this.setState({ status: 'Success!' });
            this.props.history.push('/');
        } catch (e) {
            alert(e.message);
            console.log(e);
            delete isLoading.loading;
            this.setState({ status: 'Login', isLoading: isLoading });
        }
    }

    validateForm() {
        return this.state.username.length > 0 && this.state.password.length > 0
    }

    render() {
        return (
            <StyledForm {...this.state.isLoading} onSubmit={this.handleSubmit}>
                <Header as='h2'>Please enter all fields to signup.</Header>
                <Form.Field>
                    <label>Username</label>
                    <input  placeholder='username'
                            id="username"
                            onChange={this.handleChange}
                            required
                            autoFocus />
                </Form.Field>
                <Form.Field>
                    <label>Password</label>
                    <input  placeholder='password' 
                            type='password' 
                            id="password"
                            onChange={this.handleChange}
                            required />
                </Form.Field>
                <Button type='submit'
                        disabled={!this.validateForm() || this.state.status !== 'Login'}>
                        {this.state.status}
                </Button>
            </StyledForm>
        );
    }
}
