import { FC, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { AuthorizationStatus } from '../../common/models';
import FilmList from '../../components/film-list/film-list';
import HeaderUserBlock from '../../components/header-user-block/header-user-block';
import Logo from '../../components/logo/logo';
import Spinner from '../../components/spinner/spinner';
import Tabs from '../../components/tabs/tabs';
import { useAppDispatch, useAppSelector } from '../../hooks/store-helpers';
import { fetchFilm, fetchFilmReviews, fetchSimilarFilms } from '../../store/api-actions';
import { getFilm, getSimilarFilms } from '../../store/film/film-selectors';
import { getAuthorizationStatus } from '../../store/user/user-selectors';

const FilmPage: FC = () => {
  const params = useParams();
  const filmId = Number(params.filmId);
  const dispatch = useAppDispatch();
  const authorizationStatus = useAppSelector(getAuthorizationStatus);
  const film = useAppSelector(getFilm);
  const similarFilms = useAppSelector(getSimilarFilms);

  useEffect(() => {
    if (!film || film.id !== filmId) {
      dispatch(fetchFilm(filmId));
      dispatch(fetchSimilarFilms(filmId));
      dispatch(fetchFilmReviews(filmId));
    }
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
                <button className="btn btn--play film-card__button" type="button">
                  <svg viewBox="0 0 19 19" width="19" height="19">
                    <use xlinkHref="#play-s"/>
                  </svg>
                  <span>Play</span>
                </button>
                <button className="btn btn--list film-card__button" type="button">
                  <svg viewBox="0 0 19 20" width="19" height="20">
                    <use xlinkHref="#add"/>
                  </svg>
                  <span>My list</span>
                  <span className="film-card__count">9</span>
                </button>
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
              <Tabs film={film}/>
            </div>
          </div>
        </div>
      </section>

      <div className="page-content">
        <section className="catalog catalog--like-this">
          <h2 className="catalog__title">More like this</h2>
          <FilmList films={similarFilms}/>
        </section>

        <footer className="page-footer">
          <Logo/>

          <div className="copyright">
            <p>© 2019 What to watch Ltd.</p>
          </div>
        </footer>
      </div>
    </>
  );
};

export default FilmPage;
