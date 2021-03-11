import React from 'react';
import PropTypes from 'prop-types';
import styles from './OrderInfo.module.scss';

const OrderInfo = ({ id }) => (
  <div className={styles.component}>
    <h2>OrderInfo view</h2>
    {id}
  </div>
);

OrderInfo.propTypes = {
  id: PropTypes.string,
};

export default OrderInfo;