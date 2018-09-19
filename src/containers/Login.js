import React, { Component } from 'react';
import { Button, Form } from 'semantic-ui-react';

export default class Login extends Component {
    render() {
        return (
            <Form>
                <Form.Field>
                    <label>Username</label>
                    <input placeholder='username' />
                </Form.Field>
                <Form.Field>
                    <label>Password</label>
                    <input placeholder='password' />
                </Form.Field>
                <Button type='submit'>Submit</Button>
            </Form>
        );
    }
}
