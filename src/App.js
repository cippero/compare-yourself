import React, { Component } from 'react';
import { Menu, Container } from 'semantic-ui-react';
import { Link, withRouter } from "react-router-dom";
import styled from 'styled-components';
import Routes from "./Routes";
import Footer from './components/Footer';

const StyledContainer = styled(Container)`
  margin-top: 5vh;
`;

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
            <Menu.Item 
                header 
                as={Link} to='/' 
                onClick={this.handleItemClick}>Compare Yourself</Menu.Item>
            <Menu.Item
                as={Link} to='/signup'
                name='signup'
                active={this.state.activeItem === 'signup'}
                onClick={this.handleItemClick}
            />
            <Menu.Item 
                as={Link} to='/login'
                name='login' 
                active={this.state.activeItem === 'login'} 
                onClick={this.handleItemClick} 
            />
        </Menu>
        <StyledContainer>
          <Routes childProps={childProps} />
        </StyledContainer>
        <Footer />
      </div>
    );
  }
}

export default withRouter(App);