import React from 'react';
import styles from './Tables.module.scss';

import { Link, Route, Switch } from 'react-router-dom';

import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';

import TablesBookingNew from '../TablesBookingNew/TablesBookingNew';
import TablesBookingId from '../TablesBookingId/TablesBookingId';
import TablesEventsNew from '../TablesEventsNew/TablesEventsNew';
import TablesEventsId from '../TablesEventsId/TablesEventsId';

const Tables = () => (
  <div className={styles.component}>
    <h2>Tables view</h2>
    <h3>Bookings</h3>
    <Link to={`${process.env.PUBLIC_URL}/tables/booking/:id`}>Booking info </Link>
    <Fab color='secondary' aria-label='add' component={Link} to={`${process.env.PUBLIC_URL}/tables/booking/new`}>
      <AddIcon />
    </Fab>
    <Link to={`${process.env.PUBLIC_URL}/tables/events/:id`}>Events info</Link>
    <Fab color='secondary' aria-label='add' component={Link} to={`${process.env.PUBLIC_URL}/tables/events/new`}>
      <AddIcon />
    </Fab>

    <hr />
    <Switch>
      <Route exact path={`${process.env.PUBLIC_URL}/tables/booking/new`} component={TablesBookingNew}/>
      <Route exact path={`${process.env.PUBLIC_URL}/tables/booking/:id`} component={TablesBookingId}/>
      <Route exact path={`${process.env.PUBLIC_URL}/tables/events/new`} component={TablesEventsNew}/>
      <Route exact path={`${process.env.PUBLIC_URL}/tables/events/:id`} component={TablesEventsId}/>
    </Switch>
  </div>
);

export default Tables;