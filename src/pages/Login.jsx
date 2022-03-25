import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import Loading from '../components/Loading';
import { createUser } from '../services/userAPI';

class Login extends Component {
    state = {
      nome: '',
      isDisabled: true,
      loggedIn: false,
      isClicked: false,
    };

  handleTextNome = ({ target: { name, value } }) => {
    const valueMinName = 3;
    this.setState({
      [name]: value,
      isDisabled: value.length < valueMinName,
    });
  }

  handleClick = async () => {
    const { nome } = this.state;
    this.setState({
      isClicked: true,
    });
    await createUser({ name: nome });
    this.setState({
      loggedIn: true,

    });
  }

  render() {
    const { nome, isDisabled, loggedIn, isClicked } = this.state;
    return (
      <div data-testid="page-login">
        { isClicked ? (
          <>
            <Loading />
            { loggedIn && <Redirect to="/search" /> }
          </>
        ) : (
          <>
            Login
            <label htmlFor="nome">
              <input
                id="nome"
                name="nome"
                type="text"
                placeholder="Nome"
                value={ nome }
                onChange={ this.handleTextNome }
                data-testid="login-name-input"
              />
            </label>
            <input
              id="button"
              name="button"
              type="button"
              value="Entrar"
              disabled={ isDisabled }
              data-testid="login-submit-button"
              onClick={ this.handleClick }
            />
          </>
        )}
      </div>
    );
  }
}

export default Login;
