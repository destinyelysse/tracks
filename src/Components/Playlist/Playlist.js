import React from 'react';
import Tracklist from "../Tracklist/Tracklist.js";
import "./Playlist.css";

export default class Playlist extends React.Component {

    constructor(props){
        super(props);  
        this.handleNameChange = this.handleNameChange.bind(this);    
    }

    handleNameChange(e){
        const newName = e.target.value;
        this.props.onNameChange(newName);
    }

    render(){
        console.log("I am Playlist.");
        console.log(this.props);
        return (
            <div className="Playlist">
                <input value={this.props.playlistName} 
                onChange={this.handleNameChange}></input>
                <Tracklist tracks={this.props.playlistTracks} isRemoval={true} 
                onRemove={this.props.onRemove}/>
                <button className="Playlist-save" onClick={this.props.onSave}>SAVE TO SPOTIFY</button>
            </div>
        )
    }
}