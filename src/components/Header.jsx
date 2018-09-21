import React, { Component } from 'react';
import { Menu } from 'semantic-ui-react';

export default class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {
            activeItem: null
        };
    }

    handleItemClick = (e, { name }) => this.setState({ activeItem: name });

    render() {
        return (
        <Menu>
            <Menu.Item header>This App</Menu.Item>
            <Menu.Item
                name='aboutUs'
                active={this.state.activeItem === 'aboutUs'}
                onClick={this.handleItemClick}
            />
            <Menu.Item 
                name='jobs' 
                active={this.state.activeItem === 'jobs'} 
                onClick={this.handleItemClick} 
            />
            <Menu.Item
                name='locations'
                active={this.state.activeItem === 'locations'}
                onClick={this.handleItemClick}
            />
        </Menu>
        )
    }
}