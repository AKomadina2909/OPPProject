import React,{Component} from 'react';
import '../Form/UserForm.css';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import Form from "./Form";
import Card from "../Card/Card";
import DatePicker from "react-datepicker";
import Delay from "react-delay";

const styles = theme => ({
    button: {
      margin: theme.spacing.unit,
    },
    input: {
      display: 'none',
    },
    container: {
        display: 'flex',
        flexWrap: 'wrap',
      },
      textField: {
        width: 200,
      },
  });



class EditReservationForm extends Component{
    constructor(props) {
        super(props);
        this.state = {
            date:null,
            table:null,
            restaurant:"",
            reservationbject:null,
            error:'',
            reservation:this.props.reservation,
            tableobject:null,
            userobject:null,
            success:'',
            reservations:[],
            excludeTimes:[],
        };
        this.handleChange1 = this.handleChange1.bind(this);
      }

    componentDidMount(){
        fetch(`/reservations/id/${this.props.reservation}`)
        .then(data=>data.json())
        .then(data => this.setState({time:data.timeReservation,restaurant:data.idTable.idRestaurant.nameRestaurant,table:data.idTable.idTable,tableobject:data.idTable,userobject:data.idUser}));
        fetch(`/reservations/table/${this.props.reservationobject.idTable.idTable}`).then(data=>data.json())
        .then(reservations=>this.setState({reservations:reservations}));
        

    };
   

    getMinTime(){
        var time=this.props.reservationobject.idTable.idRestaurant.openingHour;
        var inttime= time.substring(0, 2);
        return new Date().setHours(inttime);
    
    }
    getMaxTime(){
        var time=this.props.reservationobject.idTable.idRestaurant.closingHour;
        var inttime= time.substring(0, 2);
        return new Date().setHours(inttime-1);
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

    handleChange1(date) {
        this.setState({excludeTimes:[]});
        this.setState({excludeTimes:this.getexcludetimes(date)});
       
        this.setState({
          date: date
        });
      }

    onSubmit=(e)=>{
        e.preventDefault();
        var date=this.state.date;
        var hours=date.getHours();
        date.setHours(hours+1);
        const data={
            idReservation:this.state.reservation,
            dateReservation:date,
        };
        const options={
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body: JSON.stringify(data)
        };
        return fetch('/reservations/update',options)
            .then(response=>{
                if (response.status === 400) {
                    this.setState({ error: 'Podaci su neispravni'});
                    this.setState({ success: ''});
                
                } else if(response.ok){
                    this.setState({ error: ''});
                    this.setState({ success: 'Rezervacija je uspješno izmijenjena'});
                    this.props.end();
                }
            });
            
    };


    render(){
        var mindate = new Date();
        const { classes } = this.props;
        return(
            <Card>
            <div className='EditUserForm'>
            <form onSubmit={this.onSubmit}  noValidate autoComplete="off">
              <div>
                <TextField
                  id="standard-name"
                  label="Ime restorana"
                  value={this.state.restaurant}
                  margin="normal" 
                  InputLabelProps={{
                    shrink: true,
                  }}          
                  InputProps={{
                    readOnly: true,
                  }}
                 />
                </div>
                 <TextField
                  id="standard-name"
                  label="Jedinstveni broj stola"
                  value={this.state.table}
                  margin="normal"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  InputProps={{
                    readOnly: true,
                  }}   
                 />
                 <Delay
                    wait={500}
                >
                 <div>
                    <DatePicker
                    inline
                    minDate={mindate}
                   minTime={this.getMinTime()}
                    maxTime={this.getMaxTime()}
                    selected={this.state.date}
                    onChange={this.handleChange1}
                    showTimeSelect
                    excludeTimes={this.state.excludeTimes}
                    timeCaption="Vrijeme"
                    timeFormat="HH:mm"
                    />
                 </div>
                 </Delay>

                 
                   
            </form>
            <div className='error'><font color="red" size="3">{this.state.error}</font></div>
            </div>
            <div className='error'><font color="red" size="3">{this.state.error}</font></div>
            <div className='error'><font color="green" size="3">{this.state.success}</font></div>
            <Form onSubmit={this.onSubmit} >
                <Button type="submit" variant="contained" color="primary" className={classes.button}>
                  Potvrdi izmjene
                </Button>
            </Form>
            

            
            </Card>
        );
    }
}

EditReservationForm.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(EditReservationForm);
