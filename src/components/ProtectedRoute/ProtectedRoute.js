import { Route, Redirect } from 'react-router-dom';
import { useContext } from 'react';

import CurrentUserContext from '../../contexts/CurrentUserContext';

import { statuses } from '../../utils/constants';
import LoaderBar from './../LoaderBar/LoaderBar';

const ProtectedRoute = ({ component: Component, path, ...props }) => {
  const currentUser = useContext(CurrentUserContext);

  switch (currentUser.status) {
    case statuses.user.AUTHORIZED:
      return (
        <Route path={path}>
          <Component {...props} />
        </Route>
      );

    case statuses.user.UNKNOWN:
      return <LoaderBar />;

    case statuses.user.UNAUTHORIZED:
      return <Redirect to={{ pathname: '/', state: { auth: true } }} />;

    default:
      return <Redirect to="/" />;
  }
};

export default ProtectedRoute;
