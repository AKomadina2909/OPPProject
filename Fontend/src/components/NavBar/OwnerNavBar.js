import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import NoSsr from '@material-ui/core/NoSsr';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import EmployeeOrdersTable from '../Tables/EmployeeOrdersTable';
import EditRestaurantCard from '../Card/EditRestaurantCard';
import RestaurantForm from '../Form/RestaurantForm';
import Delay from 'react-delay';
import EditForm from '../Form/EditUserForm';
import OwnerReservationsTable from '../Tables/OwnerReservationsTable';
import EmployeeTable from '../Tables/EmployeeTable';
import OwnerTables from '../Tables/OwnerTablesTable';
import OwnerCategoryTable from '../Tables/OwnerCategoryTable';
import OwnerMealTable from '../Tables/OwnerMealTable';
import OwnerCommentTable from '../Tables/OwnerCommentTable';

function TabContainer(props) {
  return (
    <Typography component="div" style={{ padding: 8 * 3 }}>
      {props.children}
    </Typography>
  );
}

TabContainer.propTypes = {
  children: PropTypes.node.isRequired,
};

function LinkTab(props) {
  return <Tab component="a" onClick={event => event.preventDefault()} {...props} />;
}

const styles = theme => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
});

class OwnerNavBar extends React.Component {
  constructor(props) {
    super(props)
    this.force = this.force.bind(this)
    this.changeRestaurant = this.changeRestaurant.bind(this)
  
}
    logout = () => {
        fetch('/logout').then(() => {
          window.location.reload();
        });
      };

  state = {
    value: 0,
    force:false,
    restaurant:this.props.restaurant,
  };

  handleChange = (event, value) => {
    this.setState({ value });
  };
  force(restaurant){
    this.setState({restaurant : restaurant});
    this.setState({force : true});
    
    
  }
  changeRestaurant(name){
    fetch(`/restaurants/name/${name}`)
    .then(data=>data.json())
    .then(restaurant=>this.setState({restaurant:restaurant}))
  }
 
 

  render() {
    const { classes } = this.props;
    const { value } = this.state;

    if(this.state.restaurant==null && !this.state.force){
      return(
        <RestaurantForm force={this.force}></RestaurantForm>
      );

    }
    else {
      return (
        <Delay
            wait={100}
        >
        <NoSsr>
          <div className={classes.root}>
            <AppBar position="static">
              <Tabs fullWidth value={value} onChange={this.handleChange}>
                <LinkTab label="Moj restoran" href="page0" />
                <LinkTab label="Zaposlenici" href="page1" />
                <LinkTab label="Stolovi" href="page2" />
                <LinkTab label="Kategorije" href="page3" />
                <LinkTab label="Proizvodi" href="page4" />
                <LinkTab label="Rezervacije" href="page5" />
                <LinkTab label="Narudžbe" href="page6" />
                <LinkTab label="Osvrti" href="page7" />
                <LinkTab label="Uredi korisnički račun" href="page8" />
                <Button onClick={this.logout}  variant="contained" color="secondary" className={classes.button}>Odjavi se</Button>
              </Tabs>
            </AppBar>
            {value === 0 && <EditRestaurantCard idRestaurant={this.state.restaurant.idRestaurant} changeRestaurant={this.changeRestaurant}></EditRestaurantCard>}
            {value === 1 && <EmployeeTable idRestaurant={this.state.restaurant.idRestaurant} ownername={this.props.userName}></EmployeeTable>}
            {value === 2 && <OwnerTables namerestaurant={this.state.restaurant.nameRestaurant}></OwnerTables>}
            {value === 3 && <OwnerCategoryTable  namerestaurant={this.state.restaurant.nameRestaurant}></OwnerCategoryTable>}
            {value === 4 && <OwnerMealTable namerestaurant={this.state.restaurant.nameRestaurant}></OwnerMealTable>}
            {value === 5 && <OwnerReservationsTable idRestaurant={this.state.restaurant.idRestaurant}></OwnerReservationsTable>}
            {value === 6 && <EmployeeOrdersTable idRestaurant={this.state.restaurant.idRestaurant}></EmployeeOrdersTable>}
            {value === 7 && <OwnerCommentTable idRestaurant={this.state.restaurant.idRestaurant}></OwnerCommentTable>}
            {value === 8 && <div style={{display: 'flex',  justifyContent:'center', alignItems:'center'}}><EditForm userName={this.props.userName} ></EditForm></div>}
          </div>
        </NoSsr>
        </Delay>
      );

    }

    
  }
}

OwnerNavBar.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(OwnerNavBar);