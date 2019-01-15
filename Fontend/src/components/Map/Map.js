import React, { Component, PropTypes } from 'react';
import MapboxGl from 'mapbox-gl/dist/mapbox-gl.js';
import CalednarReservation from '../Calendar/CalendarReservation';

class Map extends Component {

  componentDidMount() {
    MapboxGl.accessToken = 'pk.eyJ1IjoiYXN0ZXJtaXgiLCJhIjoiY2pxMmV4c21lMDNrNjQybXIyeTFtZHhtdyJ9.ZQPMAUvmmIOAwJyyHndbVg'

    new MapboxGl.Map({
      container: this.container,
      style: 'mapbox://styles/mapbox/streets-v10',
      center: [15.97, 45.8], 
      zoom: 13,
      position: 'absolute',
      top: 0,
      bottom: 0,
      width: '66%',
    })
  }

  get markers () {
    /* Source: A data source specifies the geographic coordinate where the image marker gets placed. */
    return {
      type: "FeatureCollection",
      features:[{"type":"Feature","geometry":{"type":"Point","coordinates":[-16,45.8]}}]};
  }

  render() {
    return (
      <div className='Map' ref={(x) => { this.container = x }}>
           <CalednarReservation></CalednarReservation>
      </div>
    )
  }
}

export default Map