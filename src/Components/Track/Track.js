import React from 'react';
import './Track.css';

export default class Track extends React.Component {

    constructor(props){
        super(props);
        this.track = this.props.track;
        this.trackAction = this.trackAction.bind(this);
        this.renderAction = this.renderAction.bind(this);
    }

    renderAction(isRemoval) {
        if(isRemoval){
            return "-";
        } else {
            return "+";
        }
    } 

    trackAction = () => {
        this.props.buttonAction(this.track);
    }

    render(){
        return (
            <div className="Track">
                <div className="Track-information">
                    <h3>{this.track.name}</h3>
                    <p>{this.track.artist} | {this.track.album}</p>
                </div>
                <button onClick={this.trackAction} 
                className="track-action">{this.renderAction(this.props.isRemoval)}</button>
            </div>
        )
    }
}