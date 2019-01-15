import React,{Component} from 'react';
import '../Form/UserForm.css';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import Form from "../Form/Form";
import Card from "../Card/Card";
import ImageUploader from 'react-images-upload';
import ImageUpload from '../Image/ImageUpload';


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

class EditRestaurantForm extends React.Component{

  onFileLoad = (e, file) => console.log(e.target.result, file.name);
  onChange = (pictures) => this.setState({pictures});

  constructor(props) {
    super(props);
    this.setUrl=this.setUrl.bind(this);
     
  }

    state ={
        nameRestaurant:null,
        location:null,
        phoneRestaurant:null,
        emailRestaurant:null,
        faxRestaurant:null,
        openingHour:null,
        closingHour:null,
        oib:null,
        iban:null,
        error:'',
        success:'',
        imageRestaurant:'',
        lat:'',
        lng:'',
    };

   

    handleChange = name => event => {
        this.setState({
          [name]: event.target.value,
        });
    };
    setUrl(urls){
      var images=this.state.imageRestaurant;
      if(images!=null){
        for (var i = 0; i < urls.length; i++) { 
          images.push(urls[i]);
        }
        this.setState({imageRestaurant:images});
      }else{
        this.setState({imageRestaurant:urls})
      }
      
     
      
    }

    componentDidMount(){
        fetch(`/restaurants/id/${this.props.idRestaurant}`)
        .then(data=>data.json())
        .then(restaurant=>this.setState({nameRestaurant:restaurant.nameRestaurant, location:restaurant.location, phoneRestaurant:restaurant.phoneRestaurant, emailRestaurant:restaurant.emailRestaurant, faxRestaurant:restaurant.faxRestaurant, openingHour:restaurant.openingHour,closingHour:restaurant.closingHour, imageRestaurant:restaurant.imageRestaurant, oib:restaurant.oib, iban:restaurant.iban, lat:restaurant.latitude, lng:restaurant.longitude}))
    };
    

  onSubmit2=(e)=>{
    e.preventDefault();
    
  const options={
      method:'DELETE',
      headers:{
          'Content-Type':'application/json'
      },
      body:''
  };

    return fetch(`/restaurants/id/${this.props.idRestaurant}`,options)
    .then(response=>{
        if(response.ok){
        }
        else {

        } 
    })
  }


    onSubmit=(e)=>{
        e.preventDefault();
        const data={
            idRestaurant:this.props.idRestaurant,
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
        return fetch('/restaurants/update',options)
            .then(response=>{
                if(response.ok){
                    this.setState({ error: ''});
                    this.setState({ success: 'Restoran je uspješno izmijenjen'});
                    this.setState({ location: ''});
                    this.setState({ phoneRestaurant: ''});
                    this.setState({ emailRestaurant: ''});
                    this.setState({ faxRestaurant: ''});
                    this.setState({ openingHour: "08:00"});
                    this.setState({ closingHour: "20:00"});
                    this.setState({ imageRestaurant: ''});
                    this.setState({ oib: ''});
                    this.setState({ iban: ''});
                    this.props.end(this.state.nameRestaurant);
                 
                }
                else{
                    this.setState({ error: 'Podaci su neispravni'});
                    this.setState({ success: ''});
                } 
            });
            
    };

    render(){
        const { classes } = this.props;
        return(
            <div style={{display: 'flex',  justifyContent:'center', alignItems:'center'}}>
            <Card>
            <p><b><h2>Podaci o restoranu</h2></b></p>
            <div className='UserForm' style={{display: 'flex',  justifyContent:'center', alignItems:'center'}}>
            <form onSubmit={this.onSubmit}  noValidate autoComplete="off">
              <div>
                <TextField
                  id="standard-name"
                  label="Ime restorana*"
                  value={this.state.nameRestaurant}
                  onChange={this.handleChange('nameRestaurant')}
                  margin="normal"
                  InputLabelProps={{
                    shrink: true,
                  }} 
                 />
                </div>
                 <TextField
                  id="standard-name"
                  label="Adresa*"
                  value={this.state.location}
                  onChange={this.handleChange('location')}
                  margin="normal"
                  InputLabelProps={{
                    shrink: true,
                  }} 
                 />
                 <div>
                <TextField
                  id="standard-name"
                  label="Broj telefona"
                  value={this.state.phoneRestaurant}
                  onChange={this.handleChange('phoneRestaurant')}
                  margin="normal"
                  InputLabelProps={{
                    shrink: true,
                  }} 
                 />
                </div>
                <div>
                <TextField
                  id="standard-name"
                  label="E-mail"
                  value={this.state.emailRestaurant}
                  onChange={this.handleChange('emailRestaurant')}
                  margin="normal"
                  InputLabelProps={{
                    shrink: true,
                  }} 
                 />
                </div>
                <div>
                <TextField
                  id="standard-name"
                  label="Fax"
                  value={this.state.faxRestaurant}
                  onChange={this.handleChange('faxRestaurant')}
                  margin="normal"
                  InputLabelProps={{
                    shrink: true,
                  }} 
                 />
                </div>
                <form className={classes.container} noValidate>
                 <TextField
                    id="time"
                    label="Vrijeme otvaranja"
                    type="time"
                    defaultValue={this.state.openingHour}
                    className={classes.textField}
                    value={this.state.openingHour}
                    onChange={this.handleChange('openingHour')}
                    InputLabelProps={{
                    shrink: true,
                    }}
                    inputProps={{
                    step: 1800, // 30 min
                    }}
                    InputLabelProps={{
                        shrink: true,
                      }} 
                    />
                </form>
                <form className={classes.container} noValidate>
                 <TextField
                    id="time"
                    label="Vrijeme zatvaranja"
                    type="time"
                    defaultValue="20:00"
                    className={classes.textField}
                    value={this.state.closingHour}
                    onChange={this.handleChange('closingHour')}
                    InputLabelProps={{
                    shrink: true,
                    }}
                    inputProps={{
                    step: 1800, // 30 min
                    }}
                    InputLabelProps={{
                        shrink: true,
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
                  InputLabelProps={{
                    shrink: true,
                  }} 
                 />
                </div>
                <div>
                <TextField
                  id="standard-name"
                  label="IBAN*"
                  value={this.state.iban}
                  onChange={this.handleChange('iban')}
                  margin="normal"
                  InputLabelProps={{
                    shrink: true,
                  }} 
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
              <div style={{display: 'flex',  justifyContent:'center', alignItems:'center'}} className='error'><font color="green" size="3">{this.state.success}</font></div> 
              <div>
                <ImageUpload setUrl={this.setUrl}></ImageUpload>
                </div>             
            </form>
            
            </div >
            <div style={{display: 'flex',  justifyContent:'center', alignItems:'center'}}>
            <Form onSubmit={this.onSubmit} >
                <Button type="submit" variant="contained" color="primary" className={classes.button}>
                  Potvrdi izmjene
                </Button>
            </Form>
            </div>
            <div style={{display: 'flex',  justifyContent:'center', alignItems:'center'}}>
            <Form onSubmit={this.onSubmit2} >
                <Button type="submit" variant="contained" color="secondary" className={classes.button}>
                  Obriši restoran
                </Button>
            </Form>
            </div>
            </Card>
            </div>
        );
    }
}

EditRestaurantForm.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(EditRestaurantForm);
