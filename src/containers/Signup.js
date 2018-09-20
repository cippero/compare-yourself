import React, { Component } from 'react';
import { Button, Checkbox, Form } from 'semantic-ui-react';

export default class Signup extends Component {
    render() {
        return (
            <Form>
                <Form.Field>
                    <label>Username</label>
                    <input placeholder='username' required/>
                </Form.Field>
                <Form.Field>
                    <label>Email</label>
                    <input placeholder='email' type='email' required/>
                </Form.Field>
                <Form.Field>
                    <label>Password</label>
                    <input placeholder='password' type='password' required/>
                </Form.Field>
                <Form.Field>
                    <label>Confirm Password</label>
                    <input placeholder='password' type='password' required/>
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
                <Button type='submit'>Submit</Button>
            </Form>
        );
    }
}
