import { FC, useEffect, useState } from 'react';
import { getPromoFilm } from '../../common/api-functions';
import FilmList from '../../components/film-list/film-list';
import GenreList from '../../components/genre-list/genre-list';
import HeaderUserBlock from '../../components/header-user-block/header-user-block';
import Logo from '../../components/logo/logo';
import ShowMoreButton from '../../components/show-more-button/show-more-button';
import Spinner from '../../components/spinner/spinner';
import { useAppSelector } from '../../hooks/store-helpers';
import { Film } from '../../types/film.type';
import { Genre } from '../../types/genre.enum';

const MainPage: FC = () => {
  const { genre, films, isLoading } = useAppSelector((state) => state);
  const [visibleFilmsCount, setVisibleFilmsCount] = useState<number>(8);
  const [promoFilm, setPromoFilm] = useState<Film>();
  const filteredFilms = films.filter((film) => film.genre === genre || genre === Genre.ALL_GENRES);

  useEffect(() => {
    getPromoFilm().then(({ data }) => setPromoFilm(data));
  }, []);

  if (isLoading || !promoFilm) {
    return <Spinner/>;
  }

  return (
    <>
      <section className="film-card">
        <div className="film-card__bg">
          <img src={promoFilm.backgroundImage} alt={promoFilm.name}/>
        </div>

        <h1 className="visually-hidden">WTW</h1>

        <header className="page-header film-card__head">
          <Logo/>

          <HeaderUserBlock />
        </header>

        <div className="film-card__wrap">
          <div className="film-card__info">
            <div className="film-card__poster">
              <img src={promoFilm.posterImage} alt={promoFilm.name} width="218" height="327"/>
            </div>

            <div className="film-card__desc">
              <h2 className="film-card__title">{promoFilm.name}</h2>
              <p className="film-card__meta">
                <span className="film-card__genre">{promoFilm.genre}</span>
                <span className="film-card__year">{promoFilm.released}</span>
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
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="page-content">
        <section className="catalog">
          <h2 className="catalog__title visually-hidden">Catalog</h2>

          <GenreList genreList={[Genre.ALL_GENRES, ...new Set(films.map((film) => film.genre))]} setVisibleFilmsCount={setVisibleFilmsCount}/>

          <FilmList films={filteredFilms.slice(0, visibleFilmsCount)}/>

          <ShowMoreButton setVisibleFilmsCount={setVisibleFilmsCount} isVisible={filteredFilms.length > visibleFilmsCount}/>
        </section>

        <footer className="page-footer">
          <Logo light/>

          <div className="copyright">
            <p>© 2019 What to watch Ltd.</p>
          </div>
        </footer>
      </div>
    </>
  );
};

export default MainPage;
