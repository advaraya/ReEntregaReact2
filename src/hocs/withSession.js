import { connect } from 'react-redux';

import { getSession } from '../store/selectors';
import { userLogin, userLogout, saveSession } from '../store/actions';

const mapStateToProps = (state) => ({
  session: getSession(state),
});

const mapDispatchToProps = {
  userLogin,
  userLogout,
  saveSession,
};

export default connect(mapStateToProps, mapDispatchToProps);
