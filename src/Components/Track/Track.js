import React from 'react';
import './Track.css';

export default class Track extends React.Component {

    constructor(props){
        super(props);
        this.track = this.props.track;
        this.addTrack = this.addTrack.bind(this);
        console.log(this.addTrack(this.track));
    }

    renderAction(isRemoval) {
        const symbol = isRemoval ? "-" : "+";
        return symbol;
    } 

    addTrack(){
        this.props.onAdd(this.props.track);
    }

    render(){
        return (
            <div className="Track">
                <div className="Track-information">
                    <h3>{this.track.name}</h3>
                    <p>{this.track.artist} | {this.track.album}</p>
                </div>
                <button className="track-action" onClick={this.addTrack}>{this.renderAction(this.isRemoval)}</button>
            </div>
        )
    }
}