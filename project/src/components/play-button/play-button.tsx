import { FC } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useAppSelector } from '../../hooks/store-helpers';
import { getPromoFilm } from '../../store/app-reducer/app-selectors';

const PlayButton: FC = () => {
  const params = useParams();
  const filmId = params.filmId;
  const promoFilm = useAppSelector(getPromoFilm);

  return (
    <Link to={`/player/${filmId ?? promoFilm?.id}`} className="btn btn--play film-card__button" type="button">
      <svg viewBox="0 0 19 19" width="19" height="19">
        <use xlinkHref="#play-s"/>
      </svg>
      <span>Play</span>
    </Link>
  );
};

export default PlayButton;
