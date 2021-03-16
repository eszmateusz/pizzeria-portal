import React from 'react';

import styles from './Dashboard.module.scss';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const demoContentBookings = [
  {id: '1', name: 'Alex', phone: '1752543927', hours: '14:00 - 16:30', table: 2},
  {id: '2', name: 'Tomas', phone: '5983415248', hours: '13:30 - 14:00', table: 1},
  {id: '3', name: 'Blanka', phone: '6252541863', hours: '17:30 - 21:00', table: 1},
  {id: '4', name: 'Katy', phone: '3627485192', hours: '17:00 - 21:00', table: 2},
  {id: '5', name: 'John', phone: '3748449271', hours: '22:00 - 00:00', table: 3},
  {id: '6', name: 'Tomas', phone: '5983415248', hours: '12:00 - 13:00', table: 2},
];

const demoContentStatistic = [
  {id: '1', value: 362},
  {id: '2', value: 852},
  {id: '3', value: 474},
  {id: '4', value: 352},
  {id: '5', value: 417},
  {id: '6', value: 365},
];

const Dashboard = () => (
  <div className={styles.component}>
    <h2>Dashboard</h2>
    <hr />
    <h3>Order statistics - today</h3>
    <Paper>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Order ID</TableCell>
            <TableCell>Order Value</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {demoContentStatistic.map(row => (
            <TableRow key={row.id}>
              <TableCell component="th" scope="row">
                {row.id}
              </TableCell>
              <TableCell>
                {row.value}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Paper>
    <h3>Table bookings - today</h3>
    <Paper>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Client</TableCell>
            <TableCell>Phone</TableCell>
            <TableCell>Hour</TableCell>
            <TableCell>Table</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {demoContentBookings.map(row => (
            <TableRow key={row.id}>
              <TableCell component="th" scope="row">
                {row.id}
              </TableCell>
              <TableCell>
                {row.phone}
              </TableCell>
              <TableCell>
                {row.hours}
              </TableCell>
              <TableCell>
                {row.table}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Paper>
  </div>
);

export default Dashboard;