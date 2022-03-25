import React, { Component } from 'react';
import { getUser } from '../services/userAPI';
import Loading from './Loading';

class Header extends Component {
    state = {
      nome: '',
      loggedIn: false,
    }

    componentDidMount = async () => {
      const user = await getUser();
      this.setState({
        nome: user.name,
        loggedIn: true,
      });
    }

    render() {
      const { loggedIn, nome } = this.state;
      return (
        <header data-testid="header-component">
          {
            loggedIn
              ? (
                <div data-testid="header-user-name">
                  <p>{ nome }</p>
                </div>
              )
              : <Loading />
          }
        </header>
      );
    }
}

export default Header;
