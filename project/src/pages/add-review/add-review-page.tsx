import { FC } from 'react';
import { Link, useParams } from 'react-router-dom';
import { AppRoute } from '../../common/models';
import AddReviewForm from '../../components/add-review-form/add-review-form';
import HeaderUserBlock from '../../components/header-user-block/header-user-block';
import Logo from '../../components/logo/logo';
import { useAppDispatch, useAppSelector } from '../../hooks/store-helpers';
import { redirectToRoute } from '../../store/action';
import { getFilm } from '../../store/film/film-selectors';

const AddReviewPage: FC = () => {
  const params = useParams();
  const filmId = Number(params.filmId);
  const dispatch = useAppDispatch();
  const film = useAppSelector(getFilm);

  if (!film) {
    dispatch(redirectToRoute(AppRoute.Error404));
  }

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
