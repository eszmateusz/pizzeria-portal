import React from 'react';
import PropTypes from 'prop-types';
import styles from './EventInfo.module.scss';

const EventInfo = ({ id }) => (
  <div className={styles.component}>
    <h2>EventInfo view</h2>
    {id}
  </div>
);
EventInfo.propTypes = {
  id: PropTypes.string,
};

export default EventInfo;