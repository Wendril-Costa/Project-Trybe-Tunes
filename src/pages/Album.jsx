import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import getMusics from '../services/musicsAPI';
import MusicCard from '../components/MusicCard';
import { getFavoriteSongs, addSong } from '../services/favoriteSongsAPI';
import Loading from '../components/Loading';

class Album extends Component {
  state = {
    musics: [],
    favoriteSong: [],
    loading: false,
  }

  componentDidMount = async () => {
    const { match: { params: { id } } } = this.props;
    const musics = await getMusics(id);
    this.setState({
      musics,
    }, this.songFavorite);
  }

  songFavorite = async () => {
    const favoriteSong = await getFavoriteSongs();
    const favoriteID = favoriteSong.map((element) => element.trackId);
    this.setState({
      favoriteSong: favoriteID,
    });
  }

  handleChange = async ({ target }) => {
    const musicID = Number(target.name);
    this.setState((prevState) => ({
      loading: true,
      favoriteSong: [...prevState.favoriteSong, musicID],
    }));
    await addSong(musicID);
    this.setState({
      loading: false,
    });
  }

  // handleChange = async ({ target: { name, checked } }) => {
  //   const { isChecked, musics } = this.state;
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
  //   const { musics } = this.state;
  //   await addSong(musics);
  //   this.setState({
  //     loading: false,
  //     isChecked: true,
  //   });
  // }

  render() {
    const { musics, favoriteSong, loading } = this.state;
    return (
      <div data-testid="page-album">
        <Header />
        <div>
          { loading ? <Loading /> : (
            musics.map((element, index) => (
              (index === 0) ? (
                <div key={ element.collectionId }>
                  <h4
                    data-testid="artist-name"
                  >
                    {element.artistName}
                  </h4>
                  <h4
                    data-testid="album-name"
                  >
                    {element.collectionName}
                  </h4>
                </div>
              ) : <MusicCard
                key={ element.trackId }
                musics={ element }
                handleChange={ this.handleChange }
                isChecked={ favoriteSong.includes(element.trackId) }
              />
            )))}
        </div>
      </div>
    );
  }
}

Album.propTypes = {
  match: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default Album;
