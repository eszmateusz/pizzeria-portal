import React from 'react';
import PropTypes from 'prop-types';
import styles from './BookingInfo.module.scss';

const BookingInfo = ({ id }) => (
  <div className={styles.component}>
    <h2>BookingInfo view</h2>
    {id}
  </div>
);

BookingInfo.propTypes = {
  id: PropTypes.string,
};

export default BookingInfo;