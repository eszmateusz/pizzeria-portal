import { connect } from 'react-redux';
import Waiter from './Waiter';
import { getAll, fetchFromAPI, getLoadingState, fetchUpdate } from '../../../redux/tablesRedux';

const mapStateToProps = (state, props) => ({
  tables: getAll(state),
  loading: getLoadingState(state),
});

const mapDispatchToProps = (dispatch) => ({
  fetchTables: () => dispatch(fetchFromAPI()),
  updateStatus: (tableId, newStatus) => dispatch(fetchUpdate(tableId, newStatus)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Waiter);