import React from 'react'
import SpotifyWebApi from 'spotify-web-api-js'
import Album from '../components/Album'
import ReviewBox from '../components/ReviewBox'
import Sidebar from '../components/Sidebar'
import '../styles/pages/search.css'

const spotifyApi = new SpotifyWebApi()

class Search extends React.Component {
  constructor() {
    super()
    const params = this.getHashParams()
    const token = params.access_token

    token && spotifyApi.setAccessToken(token)
    
    this.state = {
      albums: [],
      inputValue: '',
      showComponent: false,
      album: {}
    }

    this.showReview = this.showReview.bind(this)
  }

  getHashParams() {
    var hashParams = {}
    var e, r = /([^&=]+)=?([^&]*)/g,
      q = window.location.hash.substring(1)
    e = r.exec(q)
    while (e) {
      hashParams[e[1]] = decodeURIComponent(e[2])
      e = r.exec(q)
    }
    return hashParams
  }

  getAlbums() {
    spotifyApi.searchAlbums(this.state.inputValue)
      .then(res => this.setState({ albums: res.albums.items }))
  }

  handleChange(e) {
    this.setState({ inputValue: e.target.value })
    this.getAlbums()
  }

  showReview(e, album) {
    this.setState({
      showComponent: true,
      album: album
    })
  }

  render() {
    return (
      <div id="main-container">
        <Sidebar />
        <div id="search-container">
          <input
            id="search-input"
            placeholder="Busque um artista ou álbum"
            value={this.state.inputValue}
            onChange={e => this.handleChange(e)} />
          <div id="search-result">
            {this.state.albums.map(album =>
              <Album {...album}
                key={album.id}
                onClick={e => this.showReview(e, album)} />
            )}
          </div>
        </div>
        {this.state.showComponent &&
          <ReviewBox album={this.state.album} />}
      </div>
    )
  }
}

export default Search