import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';
import React, {Component} from 'react';
import GridList from '@material-ui/core/GridList';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const style = {
    width: '95%',
    height: '95%'
  }
  const styleForPaper = {
    width: '95vw',
    height: '100vh',
    margin: 20,
    display: 'inline-block',
  };
 
export class MapContainer extends Component {
    
    state = {


        showingInfoWindow: false,
        activeMarker: {},
        selectedPlace: {},
        markerShown:false,
        lat:'',
        lng:'',
        restaurants:[],
        selectedRestaurant:'',
        images:[],
        meals:[],
      };

      componentDidMount(){
        fetch('/restaurants').then(data=>data.json())
        .then(restaurants=>this.setState({restaurants:restaurants}));
      };

      onMarkerClick = (props, marker, e) =>{
     
        this.setState({
          images:marker.images,
          selectedPlace: props,
          activeMarker: marker,
          showingInfoWindow: true
        });
        this.props.selected(marker.name);
    
      
    }
 
  render() {
    
      return(
        <Paper>
        <Map
        google={this.props.google}
        style={style}
        initialCenter={{
          lat: 45.804661871691806,
          lng: 15.977970123291016
        }}
        zoom={14}
        
      >
      {this.state.restaurants.map(restaurant => {
     
        return(
      
         <Marker onClick={this.onMarkerClick}
         title={restaurant.nameRestaurant}
         position={{lat:restaurant.latitude,lng:restaurant.longitude}}
         name={restaurant.nameRestaurant}
         adress={restaurant.location}
         phone={restaurant.phoneRestaurant}
         email={restaurant.emailRestaurant}
         oib={restaurant.oib}
         iban={restaurant.iban}
         fax={restaurant.faxRestaurant}
         opening={restaurant.openingHour}
         closing={restaurant.closingHour}  
         id={restaurant.idRestaurant}
         images={restaurant.imageRestaurant}
          
         />
  
       
        );

      })}

      </Map>
      </Paper>
    );
  }
}
 
export default GoogleApiWrapper({
  apiKey: ('AIzaSyBs8CyBX513L1Qwz7_7bbd5VvFXUd186Bc')
})(MapContainer)