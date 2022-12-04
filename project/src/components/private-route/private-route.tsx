import { FC } from 'react';
import { Navigate } from 'react-router-dom';
import { AppRoute, AuthorizationStatus } from '../../common/models';

type Props = {
  authorizationStatus: AuthorizationStatus;
  children: JSX.Element;
};

const PrivateRoute: FC<Props> = (props) => {
  const { authorizationStatus, children } = props;

  return (
    authorizationStatus === AuthorizationStatus.AUTH
      ? children
      : <Navigate to={AppRoute.SIGN_IN}/>
  );
};

export default PrivateRoute;
