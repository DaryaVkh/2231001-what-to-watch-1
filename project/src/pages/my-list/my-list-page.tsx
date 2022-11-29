import { FC } from 'react';
import { Link } from 'react-router-dom';
import HeaderUserBlock from '../../components/header-user-block/header-user-block';
import Logo from '../../components/logo/logo';
import { Film } from '../../types/film.type';

type Props = {
  films: Film[];
};

const MyListPage: FC<Props> = (props) => {
  const { films } = props;

  return (
    <div className="user-page">
      <header className="page-header user-page__head">
        <Logo/>

        <h1 className="page-title user-page__title">My list <span className="user-page__film-count">9</span></h1>
        <HeaderUserBlock/>
      </header>

      <section className="catalog">
        <h2 className="catalog__title visually-hidden">Catalog</h2>

        <div className="catalog__films-list">
          {
            films.map((film) => (
              <article key={film.id} className="small-film-card catalog__films-card">
                <div className="small-film-card__image">
                  <img src={film.posterImage} alt={film.name} width="280" height="175"/>
                </div>
                <h3 className="small-film-card__title">
                  <Link className="small-film-card__link" to={`/films/${film.id}`}>{film.name}</Link>
                </h3>
              </article>
            ))
          }
        </div>
      </section>

      <footer className="page-footer">
        <Logo light/>

        <div className="copyright">
          <p>© 2019 What to watch Ltd.</p>
        </div>
      </footer>
    </div>
  );
};

export default MyListPage;
