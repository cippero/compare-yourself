import React, { Component } from 'react';
import { Button, Form, Header } from 'semantic-ui-react';

export default class Signup extends Component {
    constructor(props) {
        super(props);
        this.state = {
            status: 'Signup'
            ,username: ''
            ,email: ''
            ,password: ''
            ,confirmPassword: ''
            ,newUser: null
        };
    }

    renderForm() {
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
                {/* <Form.Field>
                    <label>Age</label>
                    <input placeholder='age' type='number' required/>
                </Form.Field>
                <Form.Field>
                    <label>Height</label>
                    <input placeholder='height' type='number' required/>
                </Form.Field>
                <Form.Field>
                    <label>Income</label>
                    <input placeholder='income' type='number' required/>
                </Form.Field>
                <Form.Field>
                    <label>First Name</label>
                    <input placeholder='first name' />
                </Form.Field>
                <Form.Field>
                    <label>Last Name</label>
                    <input placeholder='last name' />
                </Form.Field>
                <Form.Field>
                    <Checkbox label='I agree to the Terms and Conditions' />
                </Form.Field> */}
                <Button type='submit'>{this.state.status}</Button>
            </Form>
        )
    };

    renderConfirmationForm() {
        return (
            <Form onSubmit={this.handleConfirmationSubmit}>
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
                    <Button type="submit" disabled={!this.validateConfirmationForm || this.state.status !== 'Verify'}>
                        {this.state.status}
                    </Button>
                </Form.Field>
            </Form>
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
