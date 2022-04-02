import React, { Component } from 'react';
import Header from '../components/Header';
// import { getFavoriteSongs } from '../services/favoriteSongsAPI';

class Favorites extends Component {
  //   state={
  //     favoriteSong: [],
  //   }

  // componentDidMount = async () => {
  //   const favoriteSong = await getFavoriteSongs();
  //   console.log(favoriteSong);
  // }

  render() {
    return (
      <div data-testid="page-favorites">
        <Header />
        Favorites
      </div>
    );
  }
}

export default Favorites;
