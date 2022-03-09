import React from 'react';
import Track from '../Track/Track.js';
import './Tracklist.css';

export default class Tracklist extends React.Component {

    constructor(props){
        super(props);
        this.tracksToRender = this.props.tracks.map((track) => {
            return <Track track={track} key={track.id} isRemoval={this.props.isRemoval} onAdd={this.props.onAdd}/>
        }
        );
    }

    render(){
        return (
            <div className="Tracklist">
                {this.tracksToRender}
            </div>
        )
    }
}