import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import getMusics from '../services/musicsAPI';
import MusicCard from '../components/MusicCard';

class Album extends Component {
  state = {
    musics: [],
  }

  componentDidMount = async () => {
    const { match: { params: { id } } } = this.props;
    const idNumber = (id);
    const musics = await getMusics(idNumber);
    this.setState({
      musics,
    });
  }

  render() {
    const { musics } = this.state;
    return (
      <div data-testid="page-album">
        <Header />
        <div>
          {musics.map((element, index) => (
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
          ))}
        </div>
      </div>
    );
  }
}

Album.propTypes = {
  match: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default Album;
