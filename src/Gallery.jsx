import React, { Component } from 'react';
import './App.css';

export default class Gallery extends Component{
  // render(){
  //   let imagesArr = this.props.tracks.reduce((imagesSoFar, track) =>{
  //     var filteredImages = track.album.images[0];
  //     .filter((image)=>{
  //       return image.width == 300;
  //     })
  //     .map(image => <img src={image.url} />);
  //
  //     imagesSoFar.push(...filteredImages);
  //     return imagesSoFar;
  //   }, []);
  //   return(
  //     <div>
  //         {imagesArr}
  //     </div>
    constructor(props){
      super(props);
      this.state = {playingUrl : '', audio: null, playing: false}
    }
    playAudio(previewUrl){
      let audio = new Audio(previewUrl);
      if(!this.state.playing){
        audio.play();
        this.setState({playing: true, playingUrl: previewUrl, audio: audio})
      }else{
        if(this.state.playingUrl === previewUrl){
          this.state.audio.pause();
          this.setState({playing: false})
        }
        else{
            this.state.audio.pause();
            audio.play();
            this.setState({playing: true, playingUrl: previewUrl, audio: audio})
        }
      }
    }
    render(){
      const tracks = this.props.tracks;
      return(
        <div>
        { tracks.map((track, index) =>{
          console.log(track);
          const imageUrl = track.album.images[0].url;
          return(
            <div
            key={index}
            className="track"
            onClick={() => this.playAudio(track.preview_url)} >
              <img src={imageUrl} alt="track" className="track-image" />
              <div className="track-play">
                <div className="track-play-inner">
                  {
                    this.state.playingUrl === track.preview_url
                                          ? <span>| |</span>
                                          : <span>&#9654;</span>
                  }
                </div>
              </div>
              <p className="track-text">{track.name}</p>
            </div>
          )
        })}
        </div>
      )
    }
}
