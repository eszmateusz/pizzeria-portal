import React from 'react';
import PropTypes from 'prop-types';
import styles from './WaiterOrderId.module.scss';

const WaiterOrderId = props => (
  <div className={styles.component}>
    <h2>WaiterOrderId view</h2>
    <span>{props.match.params.id}</span>
  </div>
);

WaiterOrderId.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }),
};

export default WaiterOrderId;