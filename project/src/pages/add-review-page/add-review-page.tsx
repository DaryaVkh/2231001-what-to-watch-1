import { FC, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { APIRoute, AuthorizationStatus } from '../../common/enums';
import AddReviewForm from '../../components/add-review-form/add-review-form';
import HeaderUserBlock from '../../components/header-user-block/header-user-block';
import Logo from '../../components/logo/logo';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { checkAuthAction, fetchFilmAction } from '../../store/api-actions';
import { getFilm } from '../../store/film-reducer/film-selectors';
import { getAuthorizationStatus } from '../../store/user-reducer/user-selectors';

const AddReviewPage: FC = () => {
  const params = useParams();
  const filmId = Number(params.filmId);
  const film = useAppSelector(getFilm);
  const authorizationStatus = useAppSelector(getAuthorizationStatus);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  if (authorizationStatus !== AuthorizationStatus.Auth) {
    navigate(APIRoute.Login);
  }

  useEffect(() => {
    let isMounted = true;

    if (isMounted && !film) {
      dispatch(fetchFilmAction(filmId));
    }

    return () => {
      isMounted = false;
    };
  }, [film, dispatch, filmId]);

  useEffect(() => {
    let isMounted = true;

    if (isMounted) {
      dispatch(checkAuthAction());
    }

    return () => {
      isMounted = false;
    };
  }, [dispatch, navigate]);

  return (
    <section className="film-card film-card--full">
      <div className="film-card__header">
        <div className="film-card__bg">
          <img src={film?.posterImage} alt={film?.name}/>
        </div>

        <h1 className="visually-hidden">WTW</h1>

        <header className="page-header">
          <Logo/>

          <nav className="breadcrumbs">
            <ul className="breadcrumbs__list">
              <li className="breadcrumbs__item">
                <Link to={`/films/${film?.id}`} className="breadcrumbs__link">{film?.name}</Link>
              </li>
              <li className="breadcrumbs__item">
                <Link to={`/films/${film?.id}/review`} className="breadcrumbs__link">Add review</Link>
              </li>
            </ul>
          </nav>

          <HeaderUserBlock/>
        </header>

        <div className="film-card__poster film-card__poster--small">
          <img src={film?.posterImage} alt={film?.name} width="218" height="327"/>
        </div>
      </div>

      <div className="add-review">
        <AddReviewForm filmId={Number(filmId)}/>
      </div>

    </section>
  );
};

export default AddReviewPage;
