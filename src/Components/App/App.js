import React from 'react';
import SearchBar from '../SearchBar/SearchBar.js';
import SearchResults from '../SearchResults/SearchResults.js';
import Playlist from '../Playlist/Playlist.js';
import './App.css';

export default class App extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      searchResults: [{name: "track1", artist: "Tourist", album: "cool", id:"1"}, {name:"track2", artist: "tourist", album: "Cool", id:"2"}],
      playlistName: "hot tracks",
      playlistTracks: [{name: "track1", artist: "DES", album: "albatrosses are awful", id:"3"}, {name: "track2", artist: "juhkob", album: "fridge of food", id:"4"}]
    }
    this.addTrack = this.addTrack.bind(this);
  }

  addTrack(track) {
    console.log("adding track");
    let trackIsNew = true;

    for(let i=0; i<this.state.playlistTracks.length; i++){
      if (this.state.playlistTracks[i].id == track.id){
        trackIsNew = false;
      }
    }

    if (trackIsNew){
      this.setState({playlistTracks: this.state.playlistTracks.concat(track)});
    }
  }

  render(){
    return (
      <div>
        <h1>tr<span className="highlight">ac</span>ks</h1>
        <div className="App">
          <SearchBar />
          <div className="App-playlist">
            <SearchResults searchResults={this.state.searchResults} onAdd={this.addTrack}/>
            <Playlist playlistName={this.state.playlistName} playlistTracks={this.state.playlistTracks}/>
          </div>
        </div>
      </div>
      );
  }
}
