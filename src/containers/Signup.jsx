import React, { Component } from 'react';
import { Button, Form, Header } from 'semantic-ui-react';
import { Auth } from "aws-amplify";
import styled from 'styled-components';

const StyledForm = styled(Form)`
    background-color: ${props => props.theme.backgroundColor};
    padding: 5vh;
    border-radius: 5px;
    border: solid black;
`;

export default class Signup extends Component {
    constructor(props) {
        super(props);
        this.state = {
            status: 'Signup'
            ,isLoading: {}
            ,username: ''
            ,email: ''
            ,password: ''
            ,confirmPassword: ''
            ,confirmationCode: ''
            ,newUser: null
        };
    }

    handleChange = e => this.setState({ [e.target.id]: e.target.value });

    handleSubmit = async e => {
        e.preventDefault();
        let isLoading = this.state.isLoading;
        isLoading.loading = true;
        this.setState({ status: 'Signing in...', isLoading: isLoading });
        try {
            const newUser = await Auth.signUp({
                username: this.state.username
                ,password: this.state.password
                ,attributes: {
                    email: this.state.email
                }
            });
            delete isLoading.loading;
            this.setState({ newUser: newUser, status: 'Verify', isLoading: isLoading});
        } catch (e) {
            alert(e.message);
            console.log(e);
            delete isLoading.loading;
            this.setState({status: 'Signup', isLoading: isLoading});
        }
    }

    handleConfirmationSubmit = async e => {
        e.preventDefault();
        let isLoading = this.state.isLoading;
        isLoading.loading = true;
        this.setState({ status: 'Verifying...', isLoading: isLoading });
        try {
            await Auth.confirmSignUp(this.state.username, this.state.confirmationCode);
            await Auth.signIn(this.state.username, this.state.password);
            this.props.userHasAuthenticated(true);
            this.props.history.push("/");
        } catch (e) {
            alert(e.message);
            console.log(e);
            delete isLoading.loading;
            this.setState({status: 'Verify', isLoading: isLoading});
        }
    }

    validateForm() {
        return  this.state.username.length > 0  &&
                this.state.email.length > 0     &&
                this.state.password.length > 0  &&
                this.state.password === this.state.confirmPassword
    }

    validateConfirmationForm() {
        return this.state.confirmationCode.length > 0
    }

    renderForm() {
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
                    <label>Email</label>
                    <input  placeholder='email' 
                            type='email' 
                            id="email"
                            onChange={this.handleChange}
                            required />
                </Form.Field>
                <Form.Field>
                    <label>Password</label>
                    <input  placeholder='password' 
                            type='password' 
                            id="password"
                            onChange={this.handleChange}
                            required />
                </Form.Field>
                <Form.Field>
                    <label>Confirm Password</label>
                    <input  placeholder='password' 
                            type='password' 
                            id="confirmPassword"
                            onChange={this.handleChange}
                            required />
                </Form.Field>
                <Form.Field>
                    <Button type='submit' disabled={!this.validateForm() || this.state.status !== 'Signup'}>
                        {this.state.status}
                    </Button>
                </Form.Field>
            </StyledForm>
        )
    };

    renderConfirmationForm() {
        return (
            <StyledForm {...this.state.isLoading} onSubmit={this.handleConfirmationSubmit}>
                <Header as='h2'>Please check your email for the code.</Header>
                <Form.Field>
                    <label>Confirmation Code</label>
                    <input  placeholder="confirmation code" 
                            type='tel'
                            id='confirmationCode'
                            onChange={this.handleChange}
                            required
                            autoFocus />
                </Form.Field>
                <Form.Field>
                    <Button type="submit" disabled={!this.validateConfirmationForm() || this.state.status !== 'Verify'}>
                        {this.state.status}
                    </Button>
                </Form.Field>
            </StyledForm>
        )
    };

    render() {
        return (
            <div>
                {this.state.newUser === null
                ? this.renderForm()
                : this.renderConfirmationForm()}
            </div>
        );
    };
}
