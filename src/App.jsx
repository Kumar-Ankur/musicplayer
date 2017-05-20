import React, { Component } from 'react';
import './App.css';
import { FormGroup, FormControl, InputGroup, Glyphicon } from 'react-bootstrap';
import Profile from './Profile';
import Gallery from './Gallery';

export default class App extends Component{
  constructor(props){
    super(props);
    this.state = {query: '', artist: null, tracks: []};
  }
  Search(){
    console.log(this.state);
    const Base_URL = 'https://api.spotify.com/v1/search?';
    let FETCH_URL = `${Base_URL}q=${this.state.query}&type=artist&limit=1`
    const ALBUM_URL = 'https://api.spotify.com/v1/artists/';
    fetch(FETCH_URL , {
      method: 'GET'
    })
    .then(response => response.json())
    .then(json=> {
      const artist = json.artists.items[0];
      this.setState({artist : artist});
      FETCH_URL = `${ALBUM_URL}${artist.id}/top-tracks?country=US&`
      console.log(FETCH_URL);
      fetch(FETCH_URL, {
        method: 'GET'
      })
      .then (response => response.json())
      .then (json => {
        const { tracks } = json;
        this.setState({tracks});
        console.log(json);
      })
    })
  }
  render(){
    return(
      <div className="App">
        <div className="App-title">Music Master App By Ankur</div>
        <FormGroup>
          <InputGroup>
            <FormControl
              type="text"
              placeholder= "Search for an Artist"
              value={this.state.value}
              onChange={event => {this.setState({query: event.target.value})}}
              onKeyPress = {event => {
                if(event.key === 'Enter'){
                  this.Search();
                }
              }}
            />
              <InputGroup.Addon onClick= {() => this.Search()}>
                <Glyphicon glyph="search"></Glyphicon>
              </InputGroup.Addon>
          </InputGroup>
        </FormGroup>
        {
          this.state.artist !==null
          ?
          <div>
          <Profile
            artist={this.state.artist}
            />
            <Gallery tracks={this.state.tracks}/>
          </div>
          : <div></div>
        }

      </div>
    )
  }
}
