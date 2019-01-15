import React,{Component} from 'react';
import '../Form/UserForm.css';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import Form from "./Form";
import Card from "../Card/Card";
import ImageUpload from '../Image/ImageUpload';
import GoogleMapCreateRestaurant from '../Map/GoogleMapCreateRestaurant';
import GoogleMapRestaurants from '../Map/GoogleMapRestaurants';

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

class RestaurantForm extends React.Component{

    constructor(props) {
        super(props);
         this.state = { pictures: [] };
         this.setUrl=this.setUrl.bind(this);
         this.viewMap=this.viewMap.bind(this);
    }

    state ={
        nameRestaurant:null,
        location:null,
        phoneRestaurant:null,
        emailRestaurant:null,
        faxRestaurant:null,
        openingHour:null,
        closingHour:null,
        imageRestaurant:'',
        oib:null,
        iban:null,
        error:'',
        success:'',
        mapview:true,
        lat:'',
        lng:'',
        
    };

    handleChange = name => event => {
        this.setState({
          [name]: event.target.value,
        });
    };
    setUrl(urls){
        this.setState({imageRestaurant:urls});
    }

    viewMap(lat,lng){
        this.setState({lat:lat});
        this.setState({lng:lng});
        this.setState({mapview:false});
    }



    onSubmit=(e)=>{
        e.preventDefault();
        const data={
            nameRestaurant: this.state.nameRestaurant,
            location: this.state.location,
            phoneRestaurant: this.state.phoneRestaurant,
            emailRestaurant: this.state.emailRestaurant,
            faxRestaurant:this.state.faxRestaurant,
            openingHour:this.state.openingHour,
            closingHour:this.state.closingHour,
            imageRestaurant: this.state.imageRestaurant,
            oib: this.state.oib,
            iban: this.state.iban,
            latitude:this.state.lat,
            longitude:this.state.lng,
            
        };
        const options={
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body: JSON.stringify(data)
        };
        return fetch('/restaurants',options)
            .then(response=>{
                if(response.ok){
                    this.setState({ error: ''});
                    this.setState({ success: 'Restoran je uspješno registriran'});
                    this.setState({ location: ''});
                    this.setState({ phoneRestaurant: ''});
                    this.setState({ emailRestaurant: ''});
                    this.setState({ faxRestaurant: ''});
                    this.setState({ openingHour: "08:00"});
                    this.setState({ closingHour: "20:00"});
                    this.setState({ imageRestaurant: ''});
                    this.setState({ oib: ''});
                    this.setState({ iban: ''});
                    fetch(`/restaurants/name/${this.state.nameRestaurant}`)
                    .then(data=>data.json())
                    .then(restaurant=>this.props.force(restaurant)); 
                
                 
                }
                if (response.status === 400) {
                    this.setState({ error: 'Podaci su neispravni'});
                    this.setState({ success: ''});
                } 
            });
            
    };

    render(){
        const { classes } = this.props;
        if(this.state.mapview==false){
            return(
                <div style={{display: 'flex',  justifyContent:'center', alignItems:'center'}}>
                <Card>
                <p><b><h2>Unesite podatke o svome restoranu</h2></b></p>
                <div className='UserForm' style={{display: 'flex',  justifyContent:'center', alignItems:'center'}}>
                <form onSubmit={this.onSubmit}  noValidate autoComplete="off">
                  <div>
                    <TextField
                      id="standard-name"
                      label="Ime restorana*"
                      value={this.state.nameRestaurant}
                      onChange={this.handleChange('nameRestaurant')}
                      margin="normal"
                     />
                    </div>
                     <TextField
                      id="standard-name"
                      label="Adresa*"
                      value={this.state.location}
                      onChange={this.handleChange('location')}
                      margin="normal"
                     />
                     <div>
                    <TextField
                      id="standard-name"
                      label="Broj telefona"
                      value={this.state.phoneRestaurant}
                      onChange={this.handleChange('phoneRestaurant')}
                      margin="normal"
                     />
                    </div>
                    <div>
                    <TextField
                      id="standard-name"
                      label="E-mail"
                      value={this.state.emailRestaurant}
                      onChange={this.handleChange('emailRestaurant')}
                      margin="normal"
                     />
                    </div>
                    <div>
                    <TextField
                      id="standard-name"
                      label="Fax"
                      value={this.state.faxRestaurant}
                      onChange={this.handleChange('faxRestaurant')}
                      margin="normal"
                     />
                    </div>
                    <form className={classes.container} noValidate>
                     <TextField
                        id="time"
                        label="Vrijeme otvaranja*"
                        type="time"
                        className={classes.textField}
                        value={this.state.openingHour}
                        onChange={this.handleChange('openingHour')}
                        InputLabelProps={{
                        shrink: true,
                        }}
                        inputProps={{
                        step: 1800, // 30 min
                        }}
                        />
                    </form>
                    <form className={classes.container} noValidate>
                     <TextField
                        id="time"
                        label="Vrijeme zatvaranja*"
                        type="time"
                        className={classes.textField}
                        value={this.state.closingHour}
                        onChange={this.handleChange('closingHour')}
                        InputLabelProps={{
                        shrink: true,
                        }}
                        inputProps={{
                        step: 1800, // 30 min
                        }}
                        />
                    </form>
                    
                    <div>
                    <TextField
                      id="standard-name"
                      label="OIB*"
                      value={this.state.oib}
                      onChange={this.handleChange('oib')}
                      margin="normal"
                     />
                    </div>
                    <div>
                    <TextField
                      id="standard-name"
                      label="IBAN*"
                      value={this.state.iban}
                      onChange={this.handleChange('iban')}
                      margin="normal"
                     />
                    </div>
                    <div>
                <TextField
                  id="standard-name"
                  label="Geografska širina*"
                  value={this.state.lat}
                  margin="normal" 
                  InputLabelProps={{
                    shrink: true,
                  }}     
                  InputProps={{
                    readOnly: true,
                  }}        
                 />
                </div>
                <div>
                <TextField
                  id="standard-name"
                  label="Geografska dužina*"
                  value={this.state.lng}
                  margin="normal" 
                  InputLabelProps={{
                    shrink: true,
                  }}     
                  InputProps={{
                    readOnly: true,
                  }}        
                 />
                </div>  
                    <div>
                        <p><font size="3">* Podaci su obavezni</font></p>
                    </div>    
                    <div  style={{display: 'flex',  justifyContent:'center', alignItems:'center'}} className='error'><font color="red" size="3">{this.state.error}</font></div>
                    <div  style={{display: 'flex',  justifyContent:'center', alignItems:'center'}} className='error'><font color="green" size="3">{this.state.success}</font></div>  
                    <div>
                    <ImageUpload setUrl={this.setUrl}></ImageUpload>
                    </div>
                    
                </form>
                
                </div >
               
                
                
                <div style={{display: 'flex',  justifyContent:'center', alignItems:'center'}}>
                <Form onSubmit={this.onSubmit} >
                    <Button type="submit" variant="contained" color="primary" className={classes.button}>
                      Stvori restoran
                    </Button>
                </Form>
                </div >
                
                </Card>
                
                </div>
            );
        }else{
            return(
                
                <GoogleMapCreateRestaurant viewMap={this.viewMap}></GoogleMapCreateRestaurant>
                
                
            );

        }
        
    }
}

RestaurantForm.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(RestaurantForm);
