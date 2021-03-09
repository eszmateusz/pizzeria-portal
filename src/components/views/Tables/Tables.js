import React from 'react';
//import PropTypes from 'prop-types';
import styles from './Tables.module.scss';

import { Link } from 'react-router-dom';

const Tables = () => (
  <div className={styles.component}>
    <h2>Tables view</h2>
    <Link to={`${process.env.PUBLIC_URL}/tables/booking/new`}> New booking</Link>
    <Link to={`${process.env.PUBLIC_URL}/tables/booking/:id`}> Booking id</Link>
    <Link to={`${process.env.PUBLIC_URL}/tables/events/new`}> New events</Link>
    <Link to={`${process.env.PUBLIC_URL}/tables/events/:id`}> Events id</Link>
  </div>
);

export default Tables;