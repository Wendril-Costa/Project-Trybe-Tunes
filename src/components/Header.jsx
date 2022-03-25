import React, { Component } from 'react';
import { Link } from 'react-router-dom';
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
          <nav>
            <Link
              to="/search"
              data-testid="link-to-search"
            >
              Search
            </Link>
            <Link
              to="/favorites"
              data-testid="link-to-favorites"
            >
              Favorites
            </Link>
            <Link
              to="/profile"
              data-testid="link-to-profile"
            >
              Profile
            </Link>
          </nav>
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
