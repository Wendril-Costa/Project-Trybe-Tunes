import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import getMusics from '../services/musicsAPI';
import MusicCard from '../components/MusicCard';
import Loading from '../components/Loading';

class Album extends Component {
  state = {
    musics: [],
    loading: false,
  }

  componentDidMount = async () => {
    const { match: { params: { id } } } = this.props;
    const musics = await getMusics(id);
    this.setState({
      musics,
    }, this.songFavorite);
  }

  render() {
    const { musics, loading } = this.state;
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
