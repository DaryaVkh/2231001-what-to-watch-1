import { FC } from 'react';
import { Navigate } from 'react-router-dom';
import { AppRoute, AuthorizationStatus } from '../../common/models';
import { useAppSelector } from '../../hooks/store-helpers';

type Props = {
  children: JSX.Element;
};

const PrivateRoute: FC<Props> = (props) => {
  const { children } = props;
  const { authorizationStatus } = useAppSelector((state) => state);

  return (
    authorizationStatus === AuthorizationStatus.AUTH
      ? children
      : <Navigate to={AppRoute.SIGN_IN}/>
  );
};

export default PrivateRoute;
