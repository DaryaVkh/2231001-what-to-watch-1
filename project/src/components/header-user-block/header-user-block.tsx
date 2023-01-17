import React, { FC, SyntheticEvent } from 'react';
import { Link } from 'react-router-dom';
import { AppRoute, AuthorizationStatus } from '../../common/enums';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { logoutAction } from '../../store/api-actions';
import { getAuthorizationStatus, getUser } from '../../store/user-reducer/user-selectors';

const HeaderUserBlock: FC = () => {
  const authorizationStatus = useAppSelector(getAuthorizationStatus);
  const user = useAppSelector(getUser);
  const dispatch = useAppDispatch();

  const handleSignOut = (event: SyntheticEvent) => {
    event.preventDefault();

    dispatch(logoutAction());
  };

  return (
    <ul className="user-block">
      {
        authorizationStatus !== AuthorizationStatus.Auth
          ? <Link to={AppRoute.SignIn} className="user-block__link">Sign in</Link>
          : (
            <>
              <li className="user-block__item">
                <Link to="/mylist">
                  <div className="user-block__avatar">
                    <img src={user?.avatarUrl} alt="User avatar" width="63" height="63"/>
                  </div>
                </Link>
              </li>
              <li className="user-block__item">
                <a href="/" className="user-block__link" onClick={handleSignOut}>Sign out</a>
              </li>
            </>
          )
      }
    </ul>
  );
};

export default React.memo(HeaderUserBlock);
