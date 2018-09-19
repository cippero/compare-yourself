import React, { Component } from 'react';
import { Menu } from 'semantic-ui-react';
import { Link, withRouter } from "react-router-dom";
import Routes from "./Routes";
// import Header from './components/Header';
import Footer from './components/Footer';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
        isAuthenticated: false,
        isAuthenticating: true,
        activeItem: null
    };
  }

  handleItemClick = (e, { name }) => this.setState({ activeItem: name });

  render() {
    const childProps = {
      isAuthenticated: this.state.isAuthenticated,
      userHasAuthenticated: this.userHasAuthenticated
    };
    return (
      <div>
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
        <Routes childProps={childProps} />
        <Footer />
      </div>
    );
  }
}

export default withRouter(App);