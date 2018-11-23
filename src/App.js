import React, { Component } from 'react';
import haverDistance from './myHaverSine.js';
import Mainpush from './pagedraw/mainpush';
import Secondarypush from './pagedraw/secondarypush';
import Lokation from './Lokation';
import GeoPushComponent from './GeoPushComponent.js';

//HARDCODEDE LOKATIONER     ||     navn, latitude, longitude, åbningstider, billede-link
var lokation3 = new Lokation('Café Analog',55.660039, 12.590965,'07.50 - 16.00','https://placekitten.com/600/400');
var lokation2 = new Lokation('ScrollBar', 55.659384, 12.590724,'lukket :(','https://placekitten.com/204/128');
var lokation1 = new Lokation('EatIT', 55.659325, 12.591203,'07.30 - 16.00', 'https://placekitten.com/300/200');
var lokation4 = new Lokation('Fakta',55.559325, 12.551203,'00.30 - 13.00','https://placekitten.com/300/200')

//MINIMUMS DISTANCE FOR AT BRUGE APPEN (i meter)
var minimumDistance = 5500;

//ARRAY MED LOKATIONER
var geoLokationer = new Array(Lokation);
geoLokationer = [lokation1, lokation2, lokation3,lokation4];


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

  //funktioner til Geo, gennemløber array med Lokationer og udregner distancen fra nuværende position
  updatePostionData(position) {
    for (let i = 0 ; i < geoLokationer.length ; i++){
      let theDistance = haverDistance(position.coords.latitude, 
                                      geoLokationer[i].latitude, 
                                      position.coords.longitude, 
                                      geoLokationer[i].longitude);
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

  returnClosestDistance(position){
    geoLokationer.sort(this.dynamicSort('distanceTo'));
    return geoLokationer[0].distanceTo;
  }

  //DET DER VISES PÅ SKÆRMEN
  render() {
            //MINIMUM DISTANCE TIL NÆRMESTE LOKATION----v (meter)   
    if(this.returnClosestDistance(geoLokationer)*1000 < minimumDistance) {
      return (  
        <div>
          <GeoPushComponent GeoUpdatePositionData={this.updatePostionData} GeoError={this.geoError}/>    

          <Mainpush                     //lukkes efter sidste textTo...
          // TÆTTESTE LOKATION - INFO
          textToFirstTitle = {'Du er tættest på: '+this.findClosestLokation(geoLokationer)[0].lokationName}       
          //textToFirstDist = {'Distance: '+Math.round(1000*this.findClosestLokation(geoLokationer)[0].distanceTo)+'m'}
          textToFirstDesc = {'Åbningstid i dag: '+geoLokationer[0].openingHrs}
          ImgToFirst = {geoLokationer[0].image}

          // 2. TÆTTESTE LOKATION - INFO
          textToSecond = {this.findClosestLokation(geoLokationer)[1].lokationName +
                          ' (' + Math.round(1000*this.findClosestLokation(geoLokationer)[1].distanceTo) + 'm)'}
          ImgToSecond = {geoLokationer[1].image}               

          // 3. TÆTTESTE LOKATION - INFO     
          textToThird = {this.findClosestLokation(geoLokationer)[2].lokationName +
          ' (' + Math.round(1000*this.findClosestLokation(geoLokationer)[2].distanceTo) + 'm)'}
          ImgToThird = {geoLokationer[2].image} 

          // 4. TÆTTESTE LOKATION - INFO
          textToLast = {'lol: '+this.findClosestLokation(geoLokationer)[3].lokationName}/>
        </div>     
      )
    }
    else {
      return (
        <div>
            <GeoPushComponent GeoUpdatePositionData={this.updatePostionData} GeoError={this.geoError}/>    
            <Secondarypush/>
        </div>
      )
    }
  }
}

export default App;
