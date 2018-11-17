import  React, { Component } from 'react';

class GeoPushComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {  };
    this.GeoOptions = { enableHighAccuracy: true, timeout: 20000, maximumAge: 0, distanceFilter: 1};
  }
// take function from owner of componemt as prop and assign it as callback 


// Playing it nice - waiting for compoennt to  mount the DOM eventhough we don't have anything to display as component

componentDidMount(){
  console.log('ComponentDidMount MyGeo2');
  console.log(this.props);

  this.watchId = navigator.geolocation.watchPosition(
    this.props.GeoUpdatePositionData,
    this.props.GeoError,
    this.GeoOptions
  );
} 

// And cleaning up when we are done using the component
  componentWillUnmount() {
    navigator.geolocation.clearWatch(this.watchId);
  }

// A special kind of component that doesn't actually srender anything but ship results to owner of the component
// Just want to be part of the React component family
  render() {
    return null;
  }
}

export default GeoPushComponent;
