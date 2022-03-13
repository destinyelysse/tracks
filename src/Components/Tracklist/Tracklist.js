import React from 'react';
import Track from '../Track/Track.js';
import './Tracklist.css';

export default class Tracklist extends React.Component {

    constructor(props){
        super(props);
        this.trackButtonAction = null;
    }

    render(){
        if (this.props.isRemoval){
            this.trackButtonAction = this.props.onRemove;
        } else {
            this.trackButtonAction = this.props.onAdd;
        }

        return (
            <div className="Tracklist">{this.props.tracks.map((track) => {
                return <Track track={track} key={track.id} isRemoval={this.props.isRemoval} buttonAction={this.trackButtonAction}/>
        })}
            </div>
        )
    }
}