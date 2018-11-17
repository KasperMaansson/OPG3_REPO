import React, { Component } from 'react';
//import haverDistance from './myHaverSine.js';
//import GeoPushComponent from './GeoPushComponent.js';

class Lokation extends React.Component {
    constructor(lokationName, latitude, longitude, openingHrs){
        super()
        this.distanceTo=0;
        this.lokationName = lokationName;
        this.latitude = latitude;
        this.longitude = longitude;
        this.openingHrs = openingHrs;
    };
}
export default Lokation;
