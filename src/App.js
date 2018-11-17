import React, { Component } from 'react';
import haverDistance from './myHaverSine.js';
import Mainpush from './pagedraw/mainpush';
import Lokation from './Lokation';
import GeoPushComponent from './GeoPushComponent.js';

//HARDCODEDE LOKATIONER M. INFO
var lokation2 = new Lokation('Rundetårn',55.681346, 12.575795,'07.30 - 16.30');
var lokation3 = new Lokation('Trianglen',55.699414, 12.577471);
var lokation1 = new Lokation('Svanemøllen',55.715519, 12.577928);

//ARRAY MED LOKATIONER
var geoLokationer = new Array(Lokation);
geoLokationer = [lokation1, lokation2, lokation3];


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      latitude:0,
      longitude:0
    };
    
    this.e = null;
    this.updatePostionData = this.updatePostionData.bind(this);
    this.geoError = this.geoError.bind(this);
  }

  //funktioner til Geo
  updatePostionData(position) {
    for (let i = 0 ; i < geoLokationer.length ; i++){
      let theDistance = haverDistance(position.coords.latitude, geoLokationer[i].latitude, position.coords.longitude, geoLokationer[i].longitude);
      geoLokationer[i].distanceTo = theDistance;
    }
    this.setState({longitude: position.coords.longitude, latitude: position.coords.longitude}) 
  }

  //GEO ERROR (?)
  geoError(err) {
    this.e = err.message;
  }

  //METODE DER BRUGES I "FINDCLOSESTLOKATION"
  dynamicSort(property) {
    var sortOrder = 1;
    if(property[0] === "-") {
        sortOrder = -1;
        property = property.substr(1);
    }
    return function (a,b) {
        var result = (a[property] < b[property]) ? -1 : (a[property] > b[property]) ? 1 : 0;
        return result * sortOrder;
    }
  }
  //METODE DER SORTERER VORES ARRAY VIA "DYNAMIC SORT" EFTER DISTANCE OG RETURNERER DET, SORTERET
  findClosestLokation(lokationer){
    lokationer.sort(this.dynamicSort('distanceTo'));
   return lokationer;
  }

  //DET DER VISES PÅ SKÆRMEN
  render() {
    return (
      <div>
        <Mainpush
          textToFirstTitle = {'Tættest på dig: '+this.findClosestLokation(geoLokationer)[0].lokationName}       
          textToFirstDist = {'Distance: '+Math.round(1000*this.findClosestLokation(geoLokationer)[0].distanceTo)+'m'}
          textToFirstDesc = {'Åbningstid i dag: '+geoLokationer[0].openingHrs}



          textToSecond = {this.findClosestLokation(geoLokationer)[1].lokationName +' : '+Math.round(1000*this.findClosestLokation(geoLokationer)[1].distanceTo)+'m'}
          textToThird = {this.findClosestLokation(geoLokationer)[2].lokationName +' : '+Math.round(1000*this.findClosestLokation(geoLokationer)[2].distanceTo)+'m'}/>
        
        <GeoPushComponent GeoUpdatePositionData={this.updatePostionData} GeoError={this.geoError}/>
      </div>
    );
  }
}


export default App;
