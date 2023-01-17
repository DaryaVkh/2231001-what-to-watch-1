import { FC, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks';
import {
  changeFilmStatusAction,
  fetchFavoriteFilmsAction,
  fetchFilmAction,
  fetchPromoFilmAction
} from '../../store/api-actions';
import { getPromoFilm } from '../../store/app-reducer/app-selectors';
import { getFilm } from '../../store/film-reducer/film-selectors';
import { getFavoriteFilms } from '../../store/user-reducer/user-selectors';

const MyListButton: FC = () => {
  const params = useParams();
  const filmId = params.filmId;
  const dispatch = useAppDispatch();
  const film = useAppSelector(getFilm);
  const promoFilm = useAppSelector(getPromoFilm);
  const favoriteFilms = useAppSelector(getFavoriteFilms);
  const [buttonIconId, setButtonIconId] = useState<string>('#add');

  useEffect(() => {
    let isMounted = true;

    if (isMounted) {
      dispatch(fetchFavoriteFilmsAction());
    }

    return () => {
      isMounted = false;
    };
  }, [dispatch]);

  useEffect(() => {
    let isMounted = true;

    if (isMounted) {
      if (filmId && film && Number(filmId) === film.id) {
        setButtonIconId(film.isFavorite ? '#in-list' : '#add');
      } else if (promoFilm) {
        setButtonIconId(promoFilm.isFavorite ? '#in-list' : '#add');
      }
    }

    return () => {
      isMounted = false;
    };
  }, [film, promoFilm, filmId]);

  const handleMyListButtonClick = () => {
    if (filmId) {
      changeFilmStatus();
    } else {
      changePromoFilmStatus();
    }
  };

  const changeFilmStatus = () => {
    const isFavorite = !film?.isFavorite;
    dispatch(changeFilmStatusAction({filmId: Number(filmId), isFavorite})).then(() => {
      dispatch(fetchFavoriteFilmsAction());
      dispatch(fetchFilmAction(Number(filmId)));
    });
  };

  const changePromoFilmStatus = () => {
    if (promoFilm) {
      const isFavorite = !promoFilm.isFavorite;
      dispatch(changeFilmStatusAction({ filmId: promoFilm.id, isFavorite })).then(() => {
        dispatch(fetchFavoriteFilmsAction());
        dispatch(fetchPromoFilmAction());
      });
    }
  };

  return (
    <button className="btn btn--list film-card__button" type="button" onClick={handleMyListButtonClick}>
      <svg viewBox="0 0 19 20" width="19" height="20">
        <use xlinkHref={buttonIconId}/>
      </svg>
      <span>My list</span>
      <span className="film-card__count">{favoriteFilms.length}</span>
    </button>
  );
};

export default MyListButton;
