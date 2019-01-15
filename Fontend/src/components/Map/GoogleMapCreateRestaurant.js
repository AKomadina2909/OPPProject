import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';

const style = {
    width: '80%',
    height: '80%'
  }
  const styleForPaper = {
    width: '80vw',
    height: '90vh',
    margin: 20,
    display: 'inline-block',
  };

 
export class MapContainer extends Component {
    
    state = {

        lat:'45.804661871691806',
        lng:'15.977970123291016',
      };
    
  onMarkerDragEnd = (coord) => {
    const { latLng } = coord;
    const lat = latLng.lat();
    const lng = latLng.lng();
    this.setState({lat:latLng.lat()})
    this.setState({lng:latLng.lng()})
    
  };
  shouldComponentUpdate(nextProps) {
    return false;
  }
 
  onSubmit=(e)=>{
    e.preventDefault();
    this.props.viewMap(this.state.lat,this.state.lng);
}
 
  render() {
      const { classes } = this.props;
        return(
          <Paper style={styleForPaper}>
            <p><h2>Odaberite poziciju restorana na karti</h2></p>
            <p>Povucite ikonu pozicije na mjesto vašeg restorana</p>
            <Button type="submit" variant="contained" color="primary" onClick={this.onSubmit}>Potvrdi lokaciju</Button>
            <br></br>
            <Map
            google={this.props.google}
            style={style}
            initialCenter={{
              lat: 45.804661871691806,
              lng: 15.977970123291016
            }}
            zoom={15}
            
          >
            <Marker position={{ lat: 45.804661871691806, lng: 15.977970123291016 }}  draggable={true} onDragend={(t, map, coord) => this.onMarkerDragEnd(coord)} /> 
          </Map>
          </Paper>

        );
    
  }
}
MapContainer.propTypes = {
  classes: PropTypes.object.isRequired,
};
 
export default GoogleApiWrapper({
  apiKey: ('AIzaSyBs8CyBX513L1Qwz7_7bbd5VvFXUd186Bc')
})(MapContainer)