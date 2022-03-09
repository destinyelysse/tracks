import React from 'react';
import './SearchResults.css';
import Tracklist from '../Tracklist/Tracklist.js';

export default class SearchResults extends React.Component {
    constructor(props){
        super(props);
        this.searchResults = this.props.searchResults;
        console.log(this.props.onAdd);
    }
    render(){
        return (
        <div className="SearchResults">
        <h2>Search Results</h2>
        <Tracklist tracks={this.props.searchResults} onAdd={this.props.onAdd} isRemoval="false"/>
    </div>
        )
    }
}

