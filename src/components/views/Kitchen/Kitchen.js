import React from 'react';

import styles from './Kitchen.module.scss';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Fab from '@material-ui/core/Fab';
import DoneIcon from '@material-ui/icons/Done';
import ClearIcon from '@material-ui/icons/Clear';

const demoContent = [
  {id: '23', table: '1', details: 'Pizza, Sauce: Tomato, Topings: cucumber'},
  {id: '24', table: '4', details: 'Espresso'},
  {id: '25', table: '6', details: 'Salad, Topings: Basil'},
  {id: '26', table: '3', details: 'Pizza, Sauce: Tomato, Topings: cucumber, ham, mushrooms'},
  {id: '27', table: 'N/A', details: '2x Pizza, Sauce: Tomato, Topings: ham, mushrooms'},
  {id: '28', table: 'N/A', details: 'Caffe Latte, Espresso, 2x Donut'},
];

const Kitchen = () => (
  <div className={styles.component}>
    <h2>Kitchen</h2>
    <hr />
    <h3>Active orders</h3>
    <Paper>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Order ID</TableCell>
            <TableCell>Table</TableCell>
            <TableCell>Order Details</TableCell>
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
                {row.table}
              </TableCell>
              <TableCell>
                {row.details}
              </TableCell>
              <TableCell>
                <Fab size="small" color='secondary' aria-label='add'>
                  <DoneIcon />
                </Fab>
                <Fab size="small" color='secondary' aria-label='add'>
                  <ClearIcon />
                </Fab>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Paper>
  </div>
);

export default Kitchen;