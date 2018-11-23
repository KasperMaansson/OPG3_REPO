import React, { Component } from 'react';
//import haverDistance from './myHaverSine.js';
//import GeoPushComponent from './GeoPushComponent.js';

class Lokation extends React.Component {
    constructor(lokationName, latitude, longitude, openingHrs,image){
        super()
        this.distanceTo=0;
        this.lokationName = lokationName;
        this.latitude = latitude;
        this.longitude = longitude;
        this.openingHrs = openingHrs;
        this.image = image;
    };
}
export default Lokation;
