import React,{Component} from 'react';
import '../Form/UserForm.css';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import EditRestaurantForm from '../Form/EditRestaurantForm';
import Form from "../Form/Form";
import Card2 from "../Card/Card";
import Button from '@material-ui/core/Button';
import {storage} from '../firebase';
import GridList from '@material-ui/core/GridList';
import IconButton from '@material-ui/core/IconButton';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';

const styles = {
  
  card: {
    maxWidth: 1000,
    minWidth: 900,
  },
  media: {
    height: 140,
  },
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
  },
  gridList: {
    flexWrap: 'nowrap',
    // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
    transform: 'translateZ(0)',
  },
 
  
  
};


class EditRestaurantCard extends React.Component{



    state ={
        nameRestaurant:null,
        location:null,
        phoneRestaurant:null,
        emailRestaurant:null,
        faxRestaurant:null,
        openingHour:null,
        closingHour:null,
        imageRestaurant:[],
        oib:null,
        iban:null,
        error:'',
        success:'',
        change:false,
    };

    constructor(props) {
      super(props)
      this.end = this.end.bind(this)
    }

    handleChange = name => event => {
        this.setState({
          [name]: event.target.value,
        });
      };

    end(name){
      this.setState({change:false});
      this.componentDidMount();
      this.props.changeRestaurant(name);
    }


    componentDidMount(){
      fetch(`/restaurants/id/${this.props.idRestaurant}`)
      .then(data=>data.json())
      .then(restaurant=>this.setState({nameRestaurant:restaurant.nameRestaurant, location:restaurant.location, phoneRestaurant:restaurant.phoneRestaurant, emailRestaurant:restaurant.emailRestaurant, faxRestaurant:restaurant.faxRestaurant, workingHours:restaurant.workingHours, imageRestaurant:restaurant.imageRestaurant, oib:restaurant.oib, iban:restaurant.iban, openingHour:restaurant.openingHour, closingHour:restaurant.closingHour}))
  };

    onSubmit=(e)=>{
      e.preventDefault();
      this.setState({ change: true });
    };

    
    render(){
        const { classes } = this.props;
        if(this.state.change==false && this.state.imageRestaurant!=null){
          return (
            <div>
            <div  style={{display: 'flex',  justifyContent:'center', alignItems:'center'}}>
            <Card className={classes.card}>
            
             <GridList className={classes.gridList} cols={2.5}>
             {this.state.imageRestaurant.map(image => {
                return(
                  
                  <img src={image}/>
             
                )
                 
                })}
              ))
             </GridList>
              
                <CardContent>
                  <Typography gutterBottom variant="h4" component="h1">
                    {this.state.nameRestaurant}
                  </Typography>
                  <Typography component="p">
                    Lokacija: {this.state.location}
                  </Typography>
                  <Typography component="p">
                    Broj telefona: {this.state.phoneRestaurant}
                  </Typography>
                  <Typography component="p">
                    Email: {this.state.emailRestaurant}
                  </Typography>
                  <Typography component="p">
                    Fax: {this.state.faxRestaurant}
                  </Typography>
                  <Typography component="p">
                    Radno vrijeme: {this.state.openingHour} - {this.state.closingHour}
                  </Typography>
                  <Typography component="p">
                    OIB: {this.state.oib}
                  </Typography>
                  <Typography component="p">
                    IBAN: {this.state.iban}
                  </Typography>
                  
                  
                </CardContent>
                <Form onSubmit={this.onSubmit} >
                <Button type="submit" variant="contained" color="primary" className={classes.button}>
                  Napravi izmjene
                </Button>
            </Form>
            </Card>
            </div>
            
            </div>
          );
        }
        else if(this.state.change==false && this.state.imageRestaurant==null){
          return (
            <div>
            <div  style={{display: 'flex',  justifyContent:'center', alignItems:'center'}}>
            <Card className={classes.card}>
            
            
              
                <CardContent>
                  <Typography gutterBottom variant="h4" component="h1">
                    {this.state.nameRestaurant}
                  </Typography>
                  <Typography component="p">
                    Adresa: {this.state.location}
                  </Typography>
                  <Typography component="p">
                    Broj telefona: {this.state.phoneRestaurant}
                  </Typography>
                  <Typography component="p">
                    Email: {this.state.emailRestaurant}
                  </Typography>
                  <Typography component="p">
                    Fax: {this.state.faxRestaurant}
                  </Typography>
                  <Typography component="p">
                    Radno vrijeme: {this.state.openingHour} - {this.state.closingHour}
                  </Typography>
                  <Typography component="p">
                    OIB: {this.state.oib}
                  </Typography>
                  <Typography component="p">
                    IBAN: {this.state.iban}
                  </Typography>
                  
                  
                </CardContent>
                <Form onSubmit={this.onSubmit} >
                <Button type="submit" variant="contained" color="primary" className={classes.button}>
                  Napravi izmjene
                </Button>
            </Form>
            </Card>
            </div>
            
            </div>
          );
        }
        else{
          return(

            <EditRestaurantForm idRestaurant={this.props.idRestaurant} end={this.end}></EditRestaurantForm>
          );


        }
        
    }
}


EditRestaurantCard.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(EditRestaurantCard);
