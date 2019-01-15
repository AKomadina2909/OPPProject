import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import NoSsr from '@material-ui/core/NoSsr';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import EditForm from '../Form/EditUserForm';
import ReservationTable from '../Tables/ReservationsSelectTable';
import Map from '../Map/Map';
import CommentTable from '../Tables/CommentTable';
import OrdersTable from '../Tables/OrdersTable';
import OrderForm from '../Form/OrderForm';
import Login from '../Login/Login';
import {BrowserRouter,Route,Switch,Router} from 'react-router-dom';
import AllCommentsTable from '../Tables/AllCommentsTable';
import CalednarReservation from '../Calendar/CalendarReservation';


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

class NavTabs extends React.Component {
    
    logout = () => {
      window.location.reload();
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
        <BrowserRouter>
                <Switch>
                  <Route path='/login' exact component={Login}></Route>
                </Switch>
            </BrowserRouter>
          <AppBar position="static">
            <Tabs fullWidth value={value} onChange={this.handleChange}>
              <LinkTab label="Rezerviraj" href="page0" />
              <LinkTab label="Naruči" href="page1" />
              <LinkTab label="Uredi korisnički račun" href="page2" />
              <LinkTab label="Moje rezervacije" href="page3" />
              <LinkTab label="Moje narudžbe" href="page4" />
              <LinkTab label="Moji osvrti" href="page5" />
              <LinkTab label="Svi osvrti" href="page6" />
              <Button onClick={this.logout}  variant="contained" color="secondary" className={classes.button}>Odjavi se</Button>
            </Tabs>
          </AppBar>
          {value === 0 && <CalednarReservation></CalednarReservation>}
          {value === 1 && <OrderForm></OrderForm>}
          {value === 2 && <div style={{display: 'flex',  justifyContent:'center', alignItems:'center'}}><EditForm userName={this.props.userName} ></EditForm></div>}
          {value === 3 && <ReservationTable></ReservationTable>}
          {value === 4 && <OrdersTable username={this.props.userName}></OrdersTable>}
          {value === 5 && <CommentTable></CommentTable>}
          {value === 6 && <AllCommentsTable></AllCommentsTable>}

        </div>
      </NoSsr>
    );
  }
}

NavTabs.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(NavTabs);