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
        console.log(marker.oib)
        console.log(marker.iban)
        fetch(`/meals/restaurant/${marker.name}`)
          .then(data=>data.json())
          .then(meals=>this.setState({meals:meals}));
    
      
    }
   
    onMapClicked = (props) => {
      if (this.state.showingInfoWindow) {
        this.setState({
          showingInfoWindow: false,
          activeMarker: null
        })
      }
    };
 
   
 
  render() {
    if(this.state.images==null){
      return(
        <Paper style={styleForPaper}>
        <p><h2>Prikaz restorana na karti</h2></p>
       <p>Kliknite na ikonu pozicije za podatke o restoranu</p>
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
      <InfoWindow
      marker={this.state.activeMarker}
      onOpen={this.windowHasOpened}
      visible={this.state.showingInfoWindow}>
        <div>
          <p><h2>{this.state.activeMarker.name}</h2></p>
          <p><b>Adresa: {this.state.activeMarker.adress}</b></p>
          <p><b>Broj telefona: {this.state.activeMarker.phone}</b></p>
          <p><b>Email: {this.state.activeMarker.email}</b></p>
          <p><b>Fax: {this.state.activeMarker.fax}</b></p>
          <p><b>OIB: {this.state.activeMarker.oib}</b></p>
          <p><b>IBAN: {this.state.activeMarker.iban}</b></p>
          <p><b>Radno vrijeme: {this.state.activeMarker.opening} - {this.state.activeMarker.closing}</b></p>
          <p><h2>Jelovnik</h2></p>
          <Table >
          <TableHead>
                 <TableRow>

                      <TableCell align="right"><b>Kategorija</b></TableCell>
                      <TableCell align="right"><b>Ime proizvoda</b></TableCell>
                      <TableCell align="right"><b>Opis</b></TableCell>
                  
                      <TableCell align="right"><b>Cijena</b></TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {this.state.meals.map(meal => {
                       
                      return (
                        <TableRow key={meal.idCategory.idCategory}
                          hover
                          
                          >
                          <TableCell align="right">{meal.idCategory.nameCategory}</TableCell>
                          <TableCell align="right">{meal.mealName}</TableCell>
                          <TableCell align="right">{meal.details}</TableCell>
                          
                          <TableCell align="right">{meal.mealPrice} kn</TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
         </Table>
        </div>
    </InfoWindow>

      </Map>
      </Paper>

    );


    }else{
      return(
        <Paper style={styleForPaper}>
        <p><h2>Prikaz restorana na karti</h2></p>
       <p>Kliknite na ikonu pozicije za podatke o restoranu</p>
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
         position={{lat:restaurant.latitude,lng:restaurant.longitude}}
         name={restaurant.nameRestaurant}
         adress={restaurant.location}
         phone={restaurant.phoneRestaurant}
         email={restaurant.emailRestaurant}
         fax={restaurant.faxRestaurant}
         opening={restaurant.openingHour}
         closing={restaurant.closingHour}  
         id={restaurant.idRestaurant}
         images={restaurant.imageRestaurant}    
         oib={restaurant.oib}
         iban={restaurant.iban}
         />
  
       
        );

      })}
      <InfoWindow
      marker={this.state.activeMarker}
      onOpen={this.windowHasOpened}
      visible={this.state.showingInfoWindow}>
        <div>
        <GridList cols={2.5}>
        
         {this.state.images.map(image => {
           
            return(
              
              <img src={image}/>
         
            )
             
            })}
          ))
         </GridList>
         
          <p><h2>{this.state.activeMarker.name}</h2></p>
          <p><b>Adresa: {this.state.activeMarker.adress}</b></p>
          <p><b>Broj telefona: {this.state.activeMarker.phone}</b></p>
          <p><b>Email: {this.state.activeMarker.email}</b></p>
          <p><b>Fax: {this.state.activeMarker.fax}</b></p>
          <p><b>OIB: {this.state.activeMarker.oib}</b></p>
          <p><b>IBAN: {this.state.activeMarker.iban}</b></p>
          <p><b>Radno vrijeme: {this.state.activeMarker.opening} - {this.state.activeMarker.closing}</b></p>
          <p><h2>Jelovnik</h2></p>
          <Table >
          <TableHead>
                 <TableRow>
                     
                      <TableCell align="right"><b>Kategorija</b></TableCell>
                      <TableCell align="right"><b>Ime proizvoda</b></TableCell>
                      <TableCell align="right"><b>Opis</b></TableCell>
                  
                      <TableCell align="right"><b>Cijena</b></TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {this.state.meals.map(meal => {
                       
                      return (
                        <TableRow key={meal.idCategory.idCategory}
                          hover
                          
                          >
                          <TableCell align="right">{meal.idCategory.nameCategory}</TableCell>
                          <TableCell align="right">{meal.mealName}</TableCell>
                          <TableCell align="right">{meal.details}</TableCell>
                          
                          <TableCell align="right">{meal.mealPrice} kn</TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
         </Table>
        </div>
    </InfoWindow>
      </Map>
      
      
         </Paper>
    );
    }     
  }
}
 
export default GoogleApiWrapper({
  apiKey: ('AIzaSyBs8CyBX513L1Qwz7_7bbd5VvFXUd186Bc')
})(MapContainer)