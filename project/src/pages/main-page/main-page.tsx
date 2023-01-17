import React, { FC, useEffect, useMemo, useState } from 'react';
import { MAX_VISIBLE_FILMS_DEFAULT } from '../../common/contants';
import { AuthorizationStatus } from '../../common/enums';
import FilmList from '../../components/film-list/film-list';
import GenreList from '../../components/genre-list/genre-list';
import HeaderUserBlock from '../../components/header-user-block/header-user-block';
import Logo from '../../components/logo/logo';
import MyListButton from '../../components/my-list-button/my-list-button';
import PageFooter from '../../components/page-footer/page-footer';
import PlayButton from '../../components/play-button/play-button';
import ShowMoreButton from '../../components/show-more-button/show-more-button';
import Spinner from '../../components/spinner/spinner';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { fetchPromoFilmAction } from '../../store/api-actions';
import { getFilms, getGenre, getIsLoading, getPromoFilm } from '../../store/app-reducer/app-selectors';
import { getAuthorizationStatus } from '../../store/user-reducer/user-selectors';
import { Genre } from '../../types/genre.enum';

const MainPage: FC = () => {
  const genre = useAppSelector(getGenre);
  const films = useAppSelector(getFilms);
  const isLoading = useAppSelector(getIsLoading);
  const promoFilm = useAppSelector(getPromoFilm);
  const authorizationStatus = useAppSelector(getAuthorizationStatus);
  const dispatch = useAppDispatch();
  const [visibleFilmsCount, setVisibleFilmsCount] = useState<number>(MAX_VISIBLE_FILMS_DEFAULT);
  const filteredFilms = useMemo(
    () => films.filter((film) => film.genre === genre || genre === Genre.AllGenres),
    [films, genre]
  );

  useEffect(() => {
    let isMounted = true;

    if (isMounted && !promoFilm) {
      dispatch(fetchPromoFilmAction());
    }

    return () => {
      isMounted = false;
    };
  }, [dispatch, promoFilm, authorizationStatus]);

  if (isLoading) {
    return <Spinner/>;
  }

  return (
    <>
      <section className="film-card">
        <div className="film-card__bg">
          <img src={promoFilm?.backgroundImage} alt={promoFilm?.name}/>
        </div>

        <h1 className="visually-hidden">WTW</h1>

        <header className="page-header film-card__head">
          <Logo/>

          <HeaderUserBlock/>
        </header>

        <div className="film-card__wrap">
          <div className="film-card__info">
            <div className="film-card__poster">
              <img src={promoFilm?.posterImage} alt={promoFilm?.name} width="218" height="327"/>
            </div>

            <div className="film-card__desc">
              <h2 className="film-card__title">{promoFilm?.name}</h2>
              <p className="film-card__meta">
                <span className="film-card__genre">{promoFilm?.genre}</span>
                <span className="film-card__year">{promoFilm?.released}</span>
              </p>

              <div className="film-card__buttons">
                <PlayButton/>
                {
                  authorizationStatus === AuthorizationStatus.Auth ? <MyListButton/> : null
                }
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="page-content">
        <section className="catalog">
          <h2 className="catalog__title visually-hidden">Catalog</h2>

          <GenreList genreList={[Genre.AllGenres, ...new Set(films.map((film) => film.genre))]} setVisibleFilmsCount={setVisibleFilmsCount}/>

          <FilmList films={filteredFilms.slice(0, visibleFilmsCount)}/>

          <ShowMoreButton setVisibleFilmsCount={setVisibleFilmsCount} isVisible={filteredFilms.length > visibleFilmsCount}/>
        </section>

        <PageFooter/>
      </div>
    </>
  );
};

export default MainPage;
