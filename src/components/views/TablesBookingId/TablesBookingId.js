import React from 'react';
import PropTypes from 'prop-types';
import styles from './TablesBookingId.module.scss';

const TablesBookingId = ({ match }) => (
  <div className={styles.component}>
    <h2>TablesBookingId view</h2>
    <span>{match.params.id}</span>
  </div>
);

TablesBookingId.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }),
};

export default TablesBookingId;