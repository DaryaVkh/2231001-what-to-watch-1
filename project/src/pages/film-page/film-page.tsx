import { FC, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { AuthorizationStatus } from '../../common/enums';
import FilmList from '../../components/film-list/film-list';
import HeaderUserBlock from '../../components/header-user-block/header-user-block';
import Logo from '../../components/logo/logo';
import MyListButton from '../../components/my-list-button/my-list-button';
import PageFooter from '../../components/page-footer/page-footer';
import PlayButton from '../../components/play-button/play-button';
import Spinner from '../../components/spinner/spinner';
import Tabs from '../../components/tabs/tabs';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { fetchFilmAction, fetchFilmReviewsAction, fetchSimilarFilmsAction } from '../../store/api-actions';
import { getFilm, getSimilarFilms } from '../../store/film-reducer/film-selectors';
import { getAuthorizationStatus } from '../../store/user-reducer/user-selectors';

const FilmPage: FC = () => {
  const params = useParams();
  const filmId = Number(params.filmId);
  const dispatch = useAppDispatch();
  const authorizationStatus = useAppSelector(getAuthorizationStatus);
  const film = useAppSelector(getFilm);
  const similarFilms = useAppSelector(getSimilarFilms);

  useEffect(() => {
    let isMounted = true;

    if (isMounted && (!film || film.id !== filmId)) {
      dispatch(fetchFilmAction(filmId));
      dispatch(fetchSimilarFilmsAction(filmId));
      dispatch(fetchFilmReviewsAction(filmId));
    }

    return () => {
      isMounted = false;
    };
  }, [film, dispatch, filmId]);

  if (!film) {
    return <Spinner />;
  }

  return (
    <>
      <section className="film-card film-card--full">
        <div className="film-card__hero">
          <div className="film-card__bg">
            <img src={film.posterImage} alt={film.name}/>
          </div>

          <h1 className="visually-hidden">WTW</h1>

          <header className="page-header film-card__head">
            <Logo/>

            <HeaderUserBlock/>
          </header>

          <div className="film-card__wrap">
            <div className="film-card__desc">
              <h2 className="film-card__title">{film.name}</h2>
              <p className="film-card__meta">
                <span className="film-card__genre">{film.genre}</span>
                <span className="film-card__year">{film.released}</span>
              </p>

              <div className="film-card__buttons">
                <PlayButton/>
                {
                  authorizationStatus === AuthorizationStatus.Auth ? <MyListButton/> : null
                }
                {
                  authorizationStatus === AuthorizationStatus.Auth
                    ? <Link to={`/films/${film.id}/review`} className="btn film-card__button">Add review</Link>
                    : null
                }
              </div>
            </div>
          </div>
        </div>

        <div className="film-card__wrap film-card__translate-top">
          <div className="film-card__info">
            <div className="film-card__poster film-card__poster--big">
              <img src={film.posterImage} alt={film.name} width="218" height="327"/>
            </div>

            <div className="film-card__desc">
              <Tabs/>
            </div>
          </div>
        </div>
      </section>

      <div className="page-content">
        <section className="catalog catalog--like-this">
          <h2 className="catalog__title">More like this</h2>
          <FilmList films={similarFilms}/>
        </section>

        <PageFooter isLogoLight/>
      </div>
    </>
  );
};

export default FilmPage;
