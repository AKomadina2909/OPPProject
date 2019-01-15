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
import RestaurantCard from '../Card/RestaurantCard';
import EditForm from '../Form/EditUserForm';


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

class EmployeeNavBar extends React.Component {
    logout = () => {
        fetch('/logout').then(() => {
          window.location.reload();
        });
      };

  state = {
    value: 0,
  };

  handleChange = (event, value) => {
    this.setState({ value });
  };

  render() {
    const { classes } = this.props;
    const { value } = this.state;

    return (
      <NoSsr>
        <div className={classes.root}>
          <AppBar position="static">
            <Tabs fullWidth value={value} onChange={this.handleChange}>
              <LinkTab label="Radno mjesto" href="page0" />
              <LinkTab label="Narudžbe" href="page1" />
              <LinkTab label="Uredi korinički račun" href="page2" />
              <Button onClick={this.logout}  variant="contained" color="secondary" className={classes.button}>Odjavi se</Button>
            </Tabs>
          </AppBar>
          {value === 0 && <RestaurantCard idRestaurant={this.props.restaurant.idRestaurant}></RestaurantCard>}
          {value === 1 && <EmployeeOrdersTable idRestaurant={this.props.restaurant.idRestaurant}></EmployeeOrdersTable>}
          {value === 2 && <div style={{display: 'flex',  justifyContent:'center', alignItems:'center'}}><EditForm userName={this.props.userName} ></EditForm></div>}
        </div>
      </NoSsr>
    );
  }
}

EmployeeNavBar.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(EmployeeNavBar);