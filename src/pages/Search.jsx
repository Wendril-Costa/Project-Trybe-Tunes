import React, { Component } from 'react';
import Header from '../components/Header';

class Search extends Component {
  state = {
    isDisabled: true,
  }

  handleTextNome = ({ target: { name, value } }) => {
    const valueMinName = 2;
    this.setState({
      [name]: value,
      isDisabled: value.length < valueMinName,
    });
  }

  render() {
    const { isDisabled } = this.state;
    return (
      <div data-testid="page-search">
        <Header />
        <label htmlFor="pesquisa">
          <input
            id="pequisa"
            name="pesquisa"
            type="text"
            placeholder="Nome do Artista"
            onChange={ this.handleTextNome }
            data-testid="search-artist-input"
          />
        </label>
        <input
          id="buttonP"
          name="buttonP"
          type="button"
          value="Pesquisar"
          disabled={ isDisabled }
          data-testid="search-artist-button"
        />
      </div>
    );
  }
}

export default Search;
