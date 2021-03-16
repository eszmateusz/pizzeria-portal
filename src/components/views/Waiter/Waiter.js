import React from 'react';
import { Link, Switch, Route } from 'react-router-dom';

import styles from './Waiter.module.scss';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';

import WaiterOrderNew from '../WaiterOrderNew/WaiterOrderNew';
import WaiterOrderId from '../WaiterOrderId/WaiterOrderId';

const demoContent = [
  {id: '1', status: 'free', order: null},
  {id: '2', status: 'thinking', order: null},
  {id: '3', status: 'ordered', order: 123},
  {id: '4', status: 'prepared', order: 234},
  {id: '5', status: 'delivered', order: 345},
  {id: '6', status: 'paid', order: 456},
];

const renderActions = status => {
  switch (status) {
    case 'free':
      return (
        <>
          <Button color="secondary" variant="contained">thinking</Button>
          <Fab size="small" color='secondary' aria-label='add' component={Link} to={`${process.env.PUBLIC_URL}/waiter/order/new`}>
            <AddIcon />
          </Fab>
        </>
      );
    case 'thinking':
      return (
        <Fab size="small" color='secondary' aria-label='add' component={Link} to={`${process.env.PUBLIC_URL}/waiter/order/new`}>
          <AddIcon />
        </Fab>
      );
    case 'ordered':
      return (
        <Button color="secondary" variant="contained">prepared</Button>
      );
    case 'prepared':
      return (
        <Button color="secondary" variant="contained">delivered</Button>
      );
    case 'delivered':
      return (
        <Button color="secondary" variant="contained">paid</Button>
      );
    case 'paid':
      return (
        <Button color="secondary" variant="contained">free</Button>
      );
    default:
      return null;
  }
};

const Waiter = () => (
  <div className={styles.component}>
    <h2>Waiter</h2>
    <hr />
    <h3>Active orders</h3>
    <Paper>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Table</TableCell>
            <TableCell>Status</TableCell>
            <TableCell>Order</TableCell>
            <TableCell>Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {demoContent.map(row => (
            <TableRow key={row.id}>
              <TableCell component="th" scope="row">
                {row.id}
              </TableCell>
              <TableCell>
                {row.status}
              </TableCell>
              <TableCell>
                {row.order && (
                  <Link to={`${process.env.PUBLIC_URL}/waiter/order/${row.order}`}>
                    {row.order}
                  </Link>
                )}
              </TableCell>
              <TableCell>
                {renderActions(row.status)}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Paper>
    <Switch>
      <Route exact path={`${process.env.PUBLIC_URL}/waiter/order/new`} component={WaiterOrderNew}/>
      <Route exact path={`${process.env.PUBLIC_URL}/waiter/order/:id`} component={WaiterOrderId}/>
    </Switch>
  </div>
);

export default Waiter;