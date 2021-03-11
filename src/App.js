import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import { StylesProvider } from '@material-ui/core/styles';
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';

import MainLayout from '../src/components/layout/MainLayout/MainLayout';
import Homepage from '../src/components/views/Homepage/Homepage';
import Login from '../src/components/views/Login/Login';
import Tables from '../src/components/views/Tables/Tables';
import BookingInfo from '../src/components/views/BookingInfo/BookingInfo';
import NewBooking from '../src/components/views/NewBooking/NewBooking';
import EventInfo from '../src/components/views/EventInfo/EventInfo';
import NewEvent from '../src/components/views/NewEvent/NewEvent';
import Waiter from '../src/components/views/Waiter/Waiter';
import OrderInfo from '../src/components/views/OrderInfo/OrderInfo';
import NewOrder from '../src/components/views/NewOrder/NewOrder';
import Kitchen from '../src/components/views/Kitchen/Kitchen';

const theme = createMuiTheme({
  palette: {
    primary: { main: '#2B4C6F' },
    // secondary: { main: '#11cb5f'},
  },
});

function App() {
  return (
    <BrowserRouter basename={'/panel'}>
      <StylesProvider injectFirst>
        <ThemeProvider theme={theme}>
          <MainLayout>
            <Switch>
              <Route exact path={`${process.env.PUBLIC_URL}/`} component={Homepage} />
              <Route exact path={process.env.PUBLIC_URL + '/login'} component={Login} />
              <Route exact path={process.env.PUBLIC_URL + '/tables'} component={Tables} />
              <Route exact path={process.env.PUBLIC_URL + '/tables/booking/:id'} component={BookingInfo} />
              <Route exact path={process.env.PUBLIC_URL + '/tables/booking/new'} component={NewBooking} />
              <Route exact path={process.env.PUBLIC_URL + '/tables/event/:id'} component={EventInfo} />
              <Route exact path={process.env.PUBLIC_URL + '/tables/event/new'} component={NewEvent} />
              <Route exact path={process.env.PUBLIC_URL + '/waiter'} component={Waiter} />
              <Route exact path={process.env.PUBLIC_URL + '/waiter/order/:id'} component={OrderInfo} />
              <Route exact path={process.env.PUBLIC_URL + '/waiter/order/new'} component={NewOrder} />
              <Route exact path={process.env.PUBLIC_URL + '/kitchen'} component={Kitchen} />
            </Switch>
          </MainLayout>
        </ThemeProvider>
      </StylesProvider>
    </BrowserRouter>
  );
}
export default App;