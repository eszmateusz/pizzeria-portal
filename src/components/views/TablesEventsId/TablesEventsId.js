import React from 'react';
import styles from './TablesEventsId.module.scss';
import PropTypes from 'prop-types';

const TablesEventsId = ({ match }) => (
  <div className={styles.component}>
    <h2>TablesEventsId View</h2>
    <span>{match.params.id}</span>
  </div>
);

TablesEventsId.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }),
};

export default TablesEventsId;