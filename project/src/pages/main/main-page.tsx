import { FC, useState } from 'react';
import FilmList from '../../components/film-list/film-list';
import GenreList from '../../components/genre-list/genre-list';
import Logo from '../../components/logo/logo';
import ShowMoreButton from '../../components/show-more-button/show-more-button';
import { useAppSelector } from '../../hooks/store-helpers';
import { FILM_LIST } from '../../mocks/films';
import { Film } from '../../types/film.type';
import { Genre } from '../../types/genre.enum';

type Props = {
  promoFilm: Film;
};

const MainPage: FC<Props> = (props) => {
  const { promoFilm } = props;
  const { genre } = useAppSelector((state) => state);
  const [visibleFilmsCount, setVisibleFilmsCount] = useState<number>(8);
  const filteredFilms = FILM_LIST.filter((film) => film.genre === genre || genre === Genre.ALL_GENRES);

  return (
    <>
      <section className="film-card">
        <div className="film-card__bg">
          <img src={promoFilm.backgroundImage} alt={promoFilm.name}/>
        </div>

        <h1 className="visually-hidden">WTW</h1>

        <header className="page-header film-card__head">
          <Logo/>

          <ul className="user-block">
            <li className="user-block__item">
              <div className="user-block__avatar">
                <img src="img/avatar.jpg" alt="User avatar" width="63" height="63"/>
              </div>
            </li>
            <li className="user-block__item">
              <a href={'/'} className="user-block__link">Sign out</a>
            </li>
          </ul>
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

          <GenreList genreList={[Genre.ALL_GENRES, ...new Set(FILM_LIST.map((film) => film.genre))]} setVisibleFilmsCount={setVisibleFilmsCount}/>

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
