import React from 'react';
import SearchBar from '../SearchBar/SearchBar.js';
import SearchResults from '../SearchResults/SearchResults.js';
import Playlist from '../Playlist/Playlist.js';
import Spotify from '../../util/Spotify.js';
import './App.css';

export default class App extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      searchResults: [],
      playlistName: "hot tracks",
      playlistTracks: []
    }
    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
    this.updatePlaylistName = this.updatePlaylistName.bind(this);
    this.savePlaylist = this.savePlaylist.bind(this);
    this.search = this.search.bind(this);
  }

  addTrack(track) {
    console.log(track);
    let trackIsNew = true;

    for(let i=0; i<this.state.playlistTracks.length; i++){
      if (this.state.playlistTracks[i].id === track.id){
        trackIsNew = false;
      }
    }

    if (trackIsNew){
      let currentTracks = this.state.playlistTracks;
      this.setState({playlistTracks: [...currentTracks, track]}, () => {
      });
    }
  }

  removeTrack(track){
    const remainingTracks = this.state.playlistTracks.filter((playlistTrack) => {
      return track.id != playlistTrack.id;
    });

    this.setState({playlistTracks: remainingTracks});
  }

  updatePlaylistName(newName){
    this.setState({playlistName: newName});
  }

  savePlaylist(){
    let trackURIs = [];
    console.log(this.state.playlistTracks);
    this.state.playlistTracks.map((track) => {
      trackURIs.push(track.uri);
    });
    console.log(trackURIs);
    Spotify.savePlaylist(this.state.playlistName, trackURIs).then(() => {
      this.setState({playlistName: "New Playlist", playlistTracks: []});
    });
  }

  search(searchTerm){
    console.log("searching: ", searchTerm);
    Spotify.search(searchTerm).then(searchResults => {
      this.setState({searchResults: searchResults});
    });
  }

  render(){
    return (
      <div>
        <h1>tr<span className="highlight">ac</span>ks</h1>
        <div className="App">
          <SearchBar onSearch={this.search}/>
          <div className="App-playlist">
            <SearchResults searchResults={this.state.searchResults} 
            onAdd={this.addTrack}/>
            <Playlist playlistName={this.state.playlistName} 
            playlistTracks={this.state.playlistTracks} 
            onRemove={this.removeTrack}
            onNameChange={this.updatePlaylistName}
            onSave={this.savePlaylist}/>
          </div>
        </div>
      </div>
      );
  }
}
