import React, { Component } from 'react';
import Particles from 'react-particles-js';
import Clarifai from 'clarifai';
import Navigation from './components/navigation/navigation';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import Logo from './components/logo/logo';
import ImageLinkForm from './components/imagelinkform/imagelinkform';
import Rank from './components/rank/rank';
import './App.css';

const app = new Clarifai.App({
  apiKey: 'd656396b44e2454a934a64f6cb45dfdb'
});

const particleOptions = {
  particles: {
   number: {
    value: 100,
    density: {
      enable: true,
      value_area: 800
    }
   },
   size: {
    value: 3
   }
  }
}

class App extends Component{
  constructor() {
    super();
    this.state = {
      input: '',
      imageUrl: ''
    }
  }
  onInputChange = (event) => {
    this.setState({input: event.target.value});
  }

  onButtonSubmit = () => {
    this.setState({imageUrl: this.state.input});
    app.models.predict(Clarifai.FACE_DETECT_MODEL, this.state.input).then(
      function(response) {
        console.log(response.outputs[0].data.regions[0].region_info.bounding_box);
      },
      function(err) {

      }
      );
  }



  render() {
  return (
    <div className="App">
    <Particles className='particles' params={particleOptions}/>
     <Navigation />
     <Logo />
     <Rank />
     <ImageLinkForm onInputChange={this.onInputChange} onButtonSubmit={this.onButtonSubmit}/>
    <FaceRecognition imageUrl={this.state.imageUrl} />
    </div>
  );
}
}

export default App;
