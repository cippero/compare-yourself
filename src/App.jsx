import React, { Component } from 'react';
import { Menu, Container } from 'semantic-ui-react';
import { Link, withRouter } from "react-router-dom";
import { Auth } from "aws-amplify";
import styled from 'styled-components';
import Routes from "./Routes";
import Footer from './components/Footer';

const StyledContainer = styled(Container)`
  margin-top: ${props => props.theme.spacing};
`;

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
        userToken: null
        ,isAuthenticated: false
        ,isAuthenticating: true
        ,activeItem: null
    };
  }

  async componentDidMount() {
    try {
      if (await Auth.currentSession()) {
        this.userHasAuthenticated(true);
        const user = await Auth.currentSession();
        this.setState({ userToken: user.idToken.jwtToken });
      }
    } catch (e) {
      if (e !== 'No current user') alert(e);
    }
    this.setState({ isAuthenticating: false});
  }

  handleItemClick = (e, { name }) => this.setState({ activeItem: name });

  userHasAuthenticated = authenticated => this.setState({ isAuthenticated: authenticated });

  handleLogout = async e => {
    await Auth.signOut();
    this.userHasAuthenticated(false);
    this.props.history.push('/login');
  }

  render() {
    const childProps = {
      userToken: this.state.userToken
      ,isAuthenticated: this.state.isAuthenticated
      ,userHasAuthenticated: this.userHasAuthenticated
    };

    return (
      <div>
        {this.state.isAuthenticated
          ? <Menu>
              <Menu.Item 
                  header 
                  as={Link} to='/' 
                  onClick={this.handleItemClick}>Compare Yourself</Menu.Item>
              <Menu.Item 
                  as={Link} to='/compare'
                  name='compare' 
                  active={this.state.activeItem === 'compare'} 
                  onClick={this.handleItemClick} 
                />
              <Menu.Item 
                  as={Link} to='/logout'
                  name='logout' 
                  active={this.state.activeItem === 'logout'} 
                  onClick={this.handleLogout} 
                />
            </Menu>
          : <Menu>
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
            </Menu>}
        <StyledContainer>
          <Routes childProps={childProps} />
        </StyledContainer>
        <Footer />
      </div>
    );
  }
}

export default withRouter(App);