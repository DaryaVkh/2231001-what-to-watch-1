import { Navigate } from 'react-router-dom';
import { AppRoute, AuthorizationStatus } from '../../common/models';
import { FC } from 'react';

type Props = {
  authorizationStatus: AuthorizationStatus;
  children: JSX.Element;
};

const PrivateRoute: FC<Props> = (props) => {
  const {authorizationStatus, children} = props;

  return (
    authorizationStatus === AuthorizationStatus.Auth
      ? children
      : <Navigate to={AppRoute.SignIn}/>
  );
};

export default PrivateRoute;
