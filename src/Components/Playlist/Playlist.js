import React from 'react';
import Tracklist from "../Tracklist/Tracklist.js";
import "./Playlist.css";

export default class Playlist extends React.Component {

    constructor(props){
        super(props);      
    }

    render(){
        return (
            <div className="Playlist">
                <h2>{this.props.playlistName}</h2>
                <Tracklist tracks={this.props.playlistTracks} isRemoval="true"/>
                <button className="Playlist-save">SAVE TO SPOTIFY</button>
            </div>
        )
    }
}