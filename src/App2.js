import React, { Component } from 'react';
import GeoComponentPush from './GeoPushComponent.js';
import haverDistance from './myHaverSine.js';


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      latitude: 0,
      longitude: 0,
      distance: 0,
      targetName: '',
      targetDescription: '',

      locationInfo: '',
      color: ''

    };
    this.e = null;
    this.updatePostionData = this.updatePostionData.bind(this);
    this.geoError = this.geoError.bind(this);
  }

  updatePostionData(position) {
    let theDistance = haverDistance(position.coords.latitude, location1.coords.latitude, position.coords.longitude, location1.coords.longitude);
    this.setState({ distance: theDistance, latitude: position.coords.latitude, longitude: position.coords.longitude, targetName: location1.name, targetDescription: location1.description });
  }

  geoError(err) {
    this.e = err.message;
  }

  displayLocationInfo() {
    this.setState({ locationInfo: 'Rundetårn er et 41,55 meter højt observationstårn, der ligger i Købmagergade i Indre By, København.' })
    this.setState({ color: 'lightgrey' })
  }

  render() {
    return (
      <div>
        <Component_1 textToDisplay={'Distance i meter til ' + this.state.targetName + ' : ' + Math.round(1000 * this.state.distance)} />
        <Component_2 textToDisplay={'Længdegrad på din nuværende position: ' + this.state.longitude} />
        <Component_3 textToDisplay={this.state.longitude} />
        <Component_4 textToDisplay={'Distance til ' + this.state.targetName + ' : ' + Math.round(1000 * this.state.distance) + ' m'} displayLocationInfo={this.displayLocationInfo.bind(this)} />
        <Component_5 locationInfo={this.state.locationInfo} color={this.state.color} />

        <GeoComponentPush GeoUpdatePositionData={this.updatePostionData} GeoError={this.geoError} />

      </div >
    );
  }
}

export default App;