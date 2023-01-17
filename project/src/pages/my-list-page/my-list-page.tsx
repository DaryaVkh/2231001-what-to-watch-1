import { FC, useEffect } from 'react';
import FilmCard from '../../components/film-card/film-card';
import HeaderUserBlock from '../../components/header-user-block/header-user-block';
import Logo from '../../components/logo/logo';
import PageFooter from '../../components/page-footer/page-footer';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { fetchFavoriteFilmsAction } from '../../store/api-actions';
import { getFavoriteFilms } from '../../store/user-reducer/user-selectors';

const MyListPage: FC = () => {
  const dispatch = useAppDispatch();
  const films = useAppSelector(getFavoriteFilms);

  useEffect(() => {
    let isMounted = true;

    if (isMounted) {
      dispatch(fetchFavoriteFilmsAction());
    }

    return () => {
      isMounted = false;
    };
  }, [dispatch]);

  return (
    <div className="user-page">
      <header className="page-header user-page__head">
        <Logo/>

        <h1 className="page-title user-page__title">My list <span className="user-page__film-count">{films.length}</span></h1>
        <HeaderUserBlock/>
      </header>

      <section className="catalog">
        <h2 className="catalog__title visually-hidden">Catalog</h2>

        <div className="catalog__films-list">
          {
            films.map((film) => <FilmCard key={film.id} film={film}/>)
          }
        </div>
      </section>

      <PageFooter isLogoLight/>
    </div>
  );
};

export default MyListPage;
