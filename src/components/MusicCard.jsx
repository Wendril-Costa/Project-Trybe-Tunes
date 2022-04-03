import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { addSong, removeSong, getFavoriteSongs } from '../services/favoriteSongsAPI';
import Loading from './Loading';

class MusicCard extends Component {
  state = {
    loading: false,
    isChecked: false,
  }

  componentDidMount = () => {
    this.setState({
      loading: true,
    }, this.getFavorite);
  }

  getFavorite = async () => {
    const { musics: { trackId } } = this.props;
    const songFavorites = await getFavoriteSongs();
    const checke = songFavorites.some((element) => element.trackId === trackId);
    this.setState({
      isChecked: checke,
      loading: false,
    });
  }

  handleChange = ({ target }) => {
    this.setState({
      loading: true,
      isChecked: target.checked,
    }, this.addAndRemovSong);
  }

  addAndRemovSong = async () => {
    const { isChecked } = this.state;
    const { musics } = this.props;
    if (isChecked) {
      await addSong(musics);
      this.setState({
        loading: false,
      });
    } else {
      await removeSong(musics);
      this.setState({
        loading: false,
      });
    }
  }

  render() {
    const { musics } = this.props;
    const { isChecked, loading } = this.state;
    return (
      <div>
        {loading ? <Loading /> : (
          <div>
            <p>{musics.trackName}</p>
            <audio data-testid="audio-component" src={ musics.previewUrl } controls>
              <track kind="captions" />
              O seu navegador não suporta o elemento
              <code>audio</code>
              .
            </audio>
            <label htmlFor={ musics.trackId }>
              Favorita
              <input
                id={ musics.trackId }
                type="checkbox"
                checked={ isChecked }
                onChange={ this.handleChange }
                data-testid={ `checkbox-music-${musics.trackId}` }
              />
            </label>
          </div>
        )}
      </div>
    );
  }
}

MusicCard.propTypes = {
  musics: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default MusicCard;
