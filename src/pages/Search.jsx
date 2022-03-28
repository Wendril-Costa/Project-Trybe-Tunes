import React, { Component } from 'react';
import Header from '../components/Header';
import searchAlbumsAPI from '../services/searchAlbumsAPI';

class Search extends Component {
  state = {
    artist: '',
    isDisabled: true,
  }

  handleTextNome = ({ target: { name, value } }) => {
    const valueMinName = 2;
    this.setState({
      [name]: value,
      isDisabled: value.length < valueMinName,
    });
  }

  handleClick = async () => {
    const { artist } = this.state;
    const aa = await searchAlbumsAPI(artist);
    console.log(aa);
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
          onClick={ this.handleClick }
        />
      </div>
    );
  }
}

export default Search;
