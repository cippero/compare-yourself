import React, { Component } from 'react';
import { Button, Form, Header } from 'semantic-ui-react';
import { Auth } from 'aws-amplify';

export default class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            status: 'Login'
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
        this.setState({ status: 'Logging in...' });
        try {
            await Auth.signIn(this.state.username, this.state.password);
            this.props.userHasAuthenticated(true);
            this.setState({ status: 'Success!' });
            setInterval(() => { this.props.history.push('/') }, 500);
        } catch (e) {
            alert(e.message);
            console.log(e);
            this.setState({ status: 'Login' });
        }
    }

    validateForm() {
        return this.state.username.length > 0 && this.state.password.length > 0
    }

    render() {
        return (
            <Form onSubmit={this.handleSubmit}>
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
            </Form>
        );
    }
}
