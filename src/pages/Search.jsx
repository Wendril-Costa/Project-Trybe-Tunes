import React, { Component } from 'react';
import AlbumCard from '../components/AlbumCard';
import Header from '../components/Header';
import searchAlbumsAPI from '../services/searchAlbumsAPI';

class Search extends Component {
  state = {
    isDisabled: true,
    isClicked: false,
    renderName: '',
    artist: '',
    albums: [],
  }

  handleChange = ({ target: { name, value } }) => {
    const valueMinName = 2;
    this.setState({
      [name]: value,
      isDisabled: value.length < valueMinName,
    });
  }

  handleClick = async () => {
    const { artist } = this.state;
    const albums = await searchAlbumsAPI(artist);
    this.setState({
      isClicked: true,
      artist: '',
      renderName: artist,
      albums,
    });
  }

  render() {
    const { isDisabled, isClicked, renderName, artist, albums } = this.state;
    return (
      <div data-testid="page-search">
        <Header />
        <label htmlFor="pesquisa">
          <input
            id="pequisa"
            name="artist"
            type="text"
            placeholder="Nome do Artista"
            value={ artist }
            onChange={ this.handleChange }
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
        { isClicked
          ? (
            <div>
              <h3>
                {`Resultado de álbuns de: ${renderName}`}
              </h3>
              <div>
                { (albums.length > 0) ? albums.map((element) => (
                  <AlbumCard
                    key={ element.collectionId }
                    collectionId={ element.collectionId }
                    collectionName={ element.collectionName }
                  />
                ))
                  : (
                    <p>Nenhum álbum foi encontrado</p>
                  )}
              </div>
            </div>
          )
          : null}
      </div>
    );
  }
}

export default Search;
