import React from 'react';
import styles from './Tables.module.scss';

import { Link, Route, Switch } from 'react-router-dom';

import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';

import TablesBookingNew from '../TablesBookingNew/TablesBookingNew';
import TablesBookingId from '../TablesBookingId/TablesBookingId';
import TablesEventsNew from '../TablesEventsNew/TablesEventsNew';
import TablesEventsId from '../TablesEventsId/TablesEventsId';

import Paper from '@material-ui/core/Paper';
import { ViewState }  from '@devexpress/dx-react-scheduler';
import { 
  Scheduler, 
  DayView, 
  Appointments, 
  AppointmentTooltip, 
  DateNavigator, 
  TodayButton, 
  Toolbar,
} from '@devexpress/dx-react-scheduler-material-ui';

const data = [
  { startDate: '2021-04-21 14:00', endDate: '2021-04-21 16:30', title: 'Alex Portney, table 1' },
  { startDate: '2021-04-21 18:00', endDate: '2021-04-21 19:30', title: 'Tomas Kirby, table 2' },
  { startDate: '2021-04-21 14:00', endDate: '2021-04-21 16:00', title: 'Blanka Kerth, table 3' },
  { startDate: '2021-04-21 15:00', endDate: '2021-04-21 17:30', title: 'Katy Simpson, table 2' },
  { startDate: '2021-04-21 19:00', endDate: '2021-04-21 20:30', title: 'John Tatcher, table 1' },
];

const Tables = () => (
  <div className={styles.component}>
    <h2>Tables</h2>
    <hr />
    <h3>Bookings and events</h3>

    <Paper>
      <Scheduler
        data={data}
      >
        <ViewState
          defaultCurrentDate={new Date()}/>
        <DayView
          startDayHour={12}
          endDayHour={24}
        />
        <Toolbar />
        <DateNavigator />
        <TodayButton />
        <Appointments />
        <AppointmentTooltip />
      </Scheduler>
    </Paper>

    <Link to={`${process.env.PUBLIC_URL}/tables/booking/as897`}>Booking info</Link>
    <Fab color='secondary' aria-label='add' component={Link} to={`${process.env.PUBLIC_URL}/tables/booking/new`}>
      <AddIcon />
    </Fab>
    <hr />

    <Link to={`${process.env.PUBLIC_URL}/tables/events/df14`}>Events info</Link>
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