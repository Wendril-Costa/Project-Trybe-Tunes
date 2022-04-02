import React, { Component } from 'react';
import PropTypes from 'prop-types';
// import { addSong, removeSong } from '../services/favoriteSongsAPI';
// import Loading from './Loading';

class MusicCard extends Component {
  // state = {
  //   loading: false,
  //   isChecked: false,
  // }

  // handleChange = async ({ target: { name, checked } }) => {
  //   const { isChecked } = this.state;
  //   const { musics } = this.props;
  //   this.setState({
  //     [name]: checked,
  //   });
  //   if (!isChecked) {
  //     await this.addClick();
  //   } else {
  //     await removeSong(musics);
  //     this.setState({
  //       loading: false,
  //       isChecked: false,
  //     });
  //   }
  // }

  // addClick = async () => {
  //   this.setState({
  //     loading: true,
  //   });
  //   const { musics } = this.props;
  //   await addSong(musics);
  //   this.setState({
  //     loading: false,
  //     isChecked: true,
  //   });
  // }

  render() {
    const { musics, isChecked, handleChange } = this.props;
    // const { isChecked } = this.state;
    return (
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
            name={ musics.trackId }
            type="checkbox"
            checked={ isChecked }
            onChange={ handleChange }
            data-testid={ `checkbox-music-${musics.trackId}` }
          />
        </label>
      </div>
    );
  }
}

MusicCard.propTypes = {
  musics: PropTypes.objectOf(PropTypes.any).isRequired,
  isChecked: PropTypes.bool.isRequired,
  handleChange: PropTypes.func.isRequired,
};

export default MusicCard;
