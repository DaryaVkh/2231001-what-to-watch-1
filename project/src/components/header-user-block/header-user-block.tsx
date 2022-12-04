import { FC, SyntheticEvent } from 'react';
import { Link } from 'react-router-dom';
import { AppRoute, AuthorizationStatus } from '../../common/models';
import { useAppDispatch, useAppSelector } from '../../hooks/store-helpers';
import { logoutAction } from '../../store/api-actions';

const HeaderUserBlock: FC = () => {
  const { authorizationStatus, user } = useAppSelector((state) => state);
  const dispatch = useAppDispatch();

  const handleSignOut = (event: SyntheticEvent) => {
    event.preventDefault();

    dispatch(logoutAction());
  };

  return (
    <ul className="user-block">
      {
        authorizationStatus !== AuthorizationStatus.AUTH
          ? <Link to={AppRoute.SIGN_IN} className="user-block__link">Sign in</Link>
          : (
            <>
              <li className="user-block__item">
                <div className="user-block__avatar">
                  <img src={user?.avatarUrl} alt="User avatar" width="63" height="63"/>
                </div>
              </li>
              <li className="user-block__item">
                <a href='/' className="user-block__link" onClick={handleSignOut}>Sign out</a>
              </li>
            </>
          )
      }
    </ul>
  );
};

export default HeaderUserBlock;
