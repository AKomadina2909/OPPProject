import React, { Component } from 'react';
import Calendar from 'react-calendar';
import ReservationForm from '../Form/ReservationForm';
import '../../App.css'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import GoogleMapRestaurants from '../Map/GoogleMapRestaurants';
import GoogleMapReservation from '../Map/GoogleMapReservation';


const styles = theme => ({
    button: {
      margin: theme.spacing.unit,
    },
    input: {
      display: 'none',
    },
    root: {
        display: 'flex',
        flexWrap: 'wrap',
      },
      formControl: {
        margin: theme.spacing.unit,
        minWidth: 120,
      },
      selectEmpty: {
        marginTop: theme.spacing.unit * 2,
      },
  });
 
class CalendarReservation extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            date: null,
            labelWidth: 0,
            tables:[],
            idTable:null,
            restaurant:null,
            nameRestaurant:'',
            restaurants:[],
            error:"",
            success:"",
            reservations:[],
            excludeTimes:[],
        };
        this.handleChange1 = this.handleChange1.bind(this);
        this.selected=this.selected.bind(this);
      }
     
      handleChange1(date) {
        this.setState({excludeTimes:[]});
        this.setState({excludeTimes:this.getexcludetimes(date)});
        this.setState({
          date: date
        });
      }
      handleChange2 = name => event => {
        this.setState({
          [name]: event.target.value,
        });
        fetch(`/reservations/table/${event.target.value}`).then(data=>data.json())
        .then(reservations=>this.setState({reservations:reservations}));
         this.setState({excludeTimes:this.getexcludetimes(new Date())});
      };
      handleChange3 = name => event => {
        this.setState({
          [name]: event.target.value,
        });
        if(event.target.value=='') return;
        fetch(`/restaurants/name/${ event.target.value}`).then(data=>data.json())
        .then(restaurant=>this.setState({restaurant:restaurant}));
        fetch(`/tables/restaurant/${event.target.value}`)
        .then(data=>data.json())
        .then(tables=>this.setState({tables:tables}));
       
      };

      componentDidMount(){
        fetch('/restaurants').then(data=>data.json())
        .then(restaurants=>this.setState({restaurants:restaurants}));
       
        

    };
    selected(name){
        this.setState({nameRestaurant:name})
        fetch(`/restaurants/name/${ name}`).then(data=>data.json())
        .then(restaurant=>this.setState({restaurant:restaurant}));
        fetch(`/tables/restaurant/${name}`)
        .then(data=>data.json())
        .then(tables=>this.setState({tables:tables}));

    }

    getMinTime(){
        var time=this.state.restaurant.openingHour;
        var inttime= time.substring(0, 2);
        return new Date().setHours(inttime);
    
    }
    getMaxTime(){
        var time=this.state.restaurant.closingHour;
        var inttime= time.substring(0, 2);
        return new Date().setHours(inttime-1);
    }

    getRestaurant(name){
        fetch(`/restaurants/name/${this.state.nameRestaurant}`).then(data=>data.json())
        .then(restaurant=>this.setState({restaurant:restaurant}))

    }

    
    getexcludetimes(date){
       
        var times=[];
        {this.state.reservations.map(reservation => {
            
            var year=reservation.dateReservation.substring(0,4);
            var month=reservation.dateReservation.substring(5,7);
            var month2;
            var day=reservation.dateReservation.substring(8,10);
            var day2;
            if(reservation.dateReservation.substring(5,6)=='0'){
                month2=reservation.dateReservation.substring(6,7);
            }else{
                month2=reservation.dateReservation.substring(5,7);
            }
            var a=parseInt(month2);
            a=a-1;
            month2=a.toString();
            if(reservation.dateReservation.substring(8,9)=='0'){
                day2=reservation.dateReservation.substring(9,10);
            }else{
                day2=reservation.dateReservation.substring(8,10);
            }
            if(year === date.getFullYear().toString() && month2=== date.getMonth().toString() && day2.toString()===date.getDate().toString()){
                var hour=reservation.timeReservation.substring(0,2);
                var minutes=reservation.timeReservation.substring(3,5);
                times.push(new Date(year,month,day,hour,minutes,0,0))
            }


        })}
        return times;
    }
   
      onSubmit=(e)=>{
       
        e.preventDefault();
        var date=this.state.date;
        var hours=date.getHours();
        date.setHours(hours+1);
        const data={
            dateReservation:date,
            idTable:this.state.idTable,
        };
        const options={
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body: JSON.stringify(data)
        };
        return fetch('/reservations',options)
            .then(response=>{
                if(response.ok){
                    this.setState({ success: 'Rezervacija uspješno obavljena'});
                    this.setState({ error: ''});
                    this.setState({ restaurant: null});
                    this.setState({ idTable: null});
                    this.setState({ nameRestaurant: ''});
                    this.setState({date:null})


                }
                if (response.status === 400) {
                    this.setState({ error: 'Podaci su neispravni'});
                    this.setState({ success: ''});
                } 
            })
    };
   
   


  render() {
    var mindate = new Date();




    const { classes } = this.props;
    let optionItems = this.state.tables.map((table) =>
                <option key={table.idTable}>{table.idTable}</option>
            );
    let optionRestaurants = this.state.restaurants.map((restaurant) =>
                <option key={restaurant.idRestaurant}>{restaurant.nameRestaurant}</option>
            );
    if(this.state.restaurant==null){
        return (

            <div>
                 <div style={{display: 'flex',  justifyContent:'center', alignItems:'center'}} className='error'><font color="red" size="3">{this.state.error}</font></div>
                <div style={{display: 'flex',  justifyContent:'center', alignItems:'center'}} className='error'><font color="green" size="3">{this.state.success}</font></div>
                <div style={{display: 'flex',  justifyContent:'center', alignItems:'center'}}>
                    <p><b>Odaberite restoran prema imenu</b></p>
                </div>
                
                <div className={classes.root} style={{display: 'flex',  justifyContent:'center', alignItems:'center'}}>
                    <FormControl className={classes.formControl}>
                        <InputLabel htmlFor="age-native-simple">Restoran</InputLabel>
                        <Select
                            native
                            value={this.state.nameRestaurant}
                            onChange={this.handleChange3('nameRestaurant')}
                            inputProps={{
                             restaurant: 'nameRestaurant',
                            }}
                        >
                         <option value="" />
                        {optionRestaurants}
                        </Select>
                    </FormControl>
                </div>
                <div style={{display: 'flex',  justifyContent:'center', alignItems:'center'}}>
                    <p><b>Odaberite restoran na karti</b></p>
                </div>
                <GoogleMapReservation selected={this.selected}></GoogleMapReservation>
                
                
                
            </div>
        );

    }else if(this.state.restaurant!=null && this.state.idTable==null){
        return (
            

            <div>
                 <div style={{display: 'flex',  justifyContent:'center', alignItems:'center'}}>
                    <p><b>Odaberite stol</b></p>
                </div>
                <div className={classes.root} style={{display: 'flex',  justifyContent:'center', alignItems:'center'}}>
                    <FormControl className={classes.formControl}>
                        <InputLabel htmlFor="age-native-simple">Broj stola</InputLabel>
                        <Select
                            native
                            value={this.state.idTable}
                            onChange={this.handleChange2('idTable')}
                            inputProps={{
                             idTable: 'idTable',
                            }}
                        >
                        <option value="" />
                        {optionItems}
                        </Select>
                    </FormControl>
                </div>
               
        
            </div>
        );

    }
    else if(this.state.restaurant!=null && this.state.idTable!=null){
        return(
        <div>
                 <div style={{display: 'flex',  justifyContent:'center', alignItems:'center'}}>
                    <p><b>Odaberite datum i vrijeme rezervacije</b></p>
                </div>
                <div style={{display: 'flex',  justifyContent:'center', alignItems:'center'}}>
                    <DatePicker
                    inline
                    minDate={mindate}
                    minTime={this.getMinTime()}
                    maxTime={this.getMaxTime()}
                    selected={this.state.date}
                    onChange={this.handleChange1}
                    excludeTimes={this.state.excludeTimes}
                    showTimeSelect
                    timeCaption="Vrijeme"
                    timeFormat="HH:mm"
                    />
                </div>    
                
                
                <div style={{display: 'flex',  justifyContent:'center', alignItems:'center'}}>
                <form onSubmit={this.onSubmit} >
                    <Button type="submit" variant="contained" color="primary" className={classes.button}>
                      Rezerviraj
                    </Button>
                </form> 
                </div>
                <div style={{display: 'flex',  justifyContent:'center', alignItems:'center'}}>
                </div>
                </div>
        );

    }
   
  }
}
CalendarReservation.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(CalendarReservation);