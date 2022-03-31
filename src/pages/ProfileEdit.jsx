import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import { getUser, updateUser } from '../services/userAPI';
import Loading from '../components/Loading';

class ProfileEdit extends Component {
  state = {
    loading: true,
    isDisabled: true,
    /* isClicked: false, */
  };

  componentDidMount = async () => {
    const user = await getUser();
    this.setState({
      nome: user.name,
      email: user.email,
      description: user.description,
      image: user.image,
      loading: false,
    });
  }

  handleChange = ({ target: { name, value } }) => {
    this.setState({
      [name]: value,
    });
    this.enableButton();
  }

  updateUserAPI = async () => {
    const { nome, email, description, image } = this.state;
    await updateUser({
      name: nome,
      email,
      image,
      description,
    });
  }

  handleClick = () => {
    this.updateUserAPI();
    /* this.setState({
      isClicked: true,
    }); */
  }

  enableButton = () => {
    const { nome, email, description, image } = this.state;
    const inputs = [nome, email, description, image];
    const complet = inputs.every((element) => element.length > 0);
    if (complet) {
      this.setState({
        isDisabled: false,
      });
    }
  }

  render() {
    const {
      nome,
      email,
      description,
      image,
      loading,
      isDisabled,
      /* isClicked */ } = this.state;

    return (
      <div data-testid="page-profile-edit">
        <Header />
        { loading ? (
          <Loading />
        ) : (
          <>
            <input
              id="nome"
              name="nome"
              data-testid="edit-input-name"
              value={ nome }
              type="text"
              onChange={ this.handleChange }
            />
            <input
              id="email"
              name="email"
              data-testid="edit-input-email"
              value={ email }
              type="email"
              onChange={ this.handleChange }
            />
            <input
              id="description"
              name="description"
              data-testid="edit-input-description"
              value={ description }
              type="text"
              onChange={ this.handleChange }
            />
            <input
              id="image"
              name="image"
              data-testid="edit-input-image"
              value={ image }
              type="text"
              alt="imagem do usuario"
              onChange={ this.handleChange }
            />
            <Link to="/profile">
              <input
                id="button"
                name="button"
                data-testid="edit-button-save"
                type="button"
                value="Editar perfil"
                disabled={ isDisabled }
                onClick={ this.handleClick }
              />
            </Link>
          </>
        )}
      </div>
    );
  }
}

export default ProfileEdit;
