import { FC } from 'react';
import { Navigate } from 'react-router-dom';
import { AppRoute, AuthorizationStatus } from '../../common/models';
import { useAppSelector } from '../../hooks/store-helpers';
import { getAuthorizationStatus } from '../../store/user/user-selectors';

type Props = {
  children: JSX.Element;
};

const PrivateRoute: FC<Props> = (props) => {
  const { children } = props;
  const authorizationStatus = useAppSelector(getAuthorizationStatus);

  return (
    authorizationStatus === AuthorizationStatus.Auth
      ? children
      : <Navigate to={AppRoute.SignIn}/>
  );
};

export default PrivateRoute;
