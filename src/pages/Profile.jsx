import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Loading from '../components/Loading';
import { getUser } from '../services/userAPI';

class Profile extends Component {
  state = {
    name: '',
    email: '',
    description: '',
    image: '',
    loading: false,
  };

  componentDidMount = async () => {
    const user = await getUser();
    this.setState({
      name: user.name,
      email: user.email,
      description: user.description,
      image: user.image,
      loading: false,
    });
  }

  render() {
    const { name, email, description, image, loading } = this.state;
    return (
      <div data-testid="page-profile">
        <Header />
        { loading ? (
          <Loading />
        ) : (
          <>
            <p>{ name }</p>
            <p>{ email }</p>
            <p>{ description }</p>
            <image
              data-testid="profile-image"
              src={ image }
            />
            <Link
              to="/profile/edit"
            >
              Editar perfil
            </Link>
          </>
        )}
      </div>
    );
  }
}

export default Profile;
