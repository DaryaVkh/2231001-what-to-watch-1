import { FC, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks/store-helpers';
import { changeFilmStatus, fetchFavoriteFilms, fetchFilm, fetchPromoFilm } from '../../store/api-actions';
import { getPromoFilm } from '../../store/app/app-selectors';
import { getFilm } from '../../store/film/film-selectors';
import { getFavoriteFilms } from '../../store/user/user-selectors';

const MyListButton: FC = () => {
  const params = useParams();
  const filmId = params.filmId;
  const dispatch = useAppDispatch();
  const film = useAppSelector(getFilm);
  const promoFilm = useAppSelector(getPromoFilm);
  const favoriteFilms = useAppSelector(getFavoriteFilms);
  const [buttonIconId, setButtonIconId] = useState<string>('#add');

  useEffect(() => {
    if (filmId && film && Number(filmId) === film.id) {
      setButtonIconId(film.isFavorite ? '#in-list' : '#add');
    } else if (promoFilm) {
      setButtonIconId(promoFilm.isFavorite ? '#in-list' : '#add');
    }
  }, [film, promoFilm]);

  const toggleIsFavorite = () => {
    if (filmId) {
      const isFavorite = !film?.isFavorite;
      dispatch(changeFilmStatus({filmId: Number(filmId), isFavorite})).then(() => {
        setButtonIconId(isFavorite ? '#in-list' : '#add');
        dispatch(fetchFavoriteFilms());
        dispatch(fetchFilm(Number(filmId)));
      });
    } else if (promoFilm) {
      const isFavorite = !promoFilm.isFavorite;
      dispatch(changeFilmStatus({filmId: promoFilm.id, isFavorite})).then(() => {
        setButtonIconId(isFavorite ? '#in-list' : '#add');
        dispatch(fetchFavoriteFilms());
        dispatch(fetchPromoFilm());
      });
    }
  };

  return (
    <button className="btn btn--list film-card__button" type="button" onClick={toggleIsFavorite}>
      <svg viewBox="0 0 19 20" width="19" height="20">
        <use xlinkHref={buttonIconId}/>
      </svg>
      <span>My list</span>
      <span className="film-card__count">{favoriteFilms.length}</span>
    </button>
  );
};

export default MyListButton;
