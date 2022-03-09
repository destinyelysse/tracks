import React from 'react';
import './SearchBar.css';

export default class SearchBar extends React.Component {
    render(){
        return (
            <div className="SearchBar">
                <input placeholder="Enter a song, album, or artist."/>
                <button className="SearchButton">SEARCH</button>
            </div>
        )
    }
}