import { FC } from 'react';
import { getRatingCategoryByRating } from '../../common/functions';
import { useAppSelector } from '../../hooks/store-helpers';
import { getFilm } from '../../store/film-reducer/film-selectors';

const OverviewTab: FC = () => {
  const film = useAppSelector(getFilm);

  return (
    <>
      <div className="film-rating">
        <div className="film-rating__score">{film?.rating}</div>
        <p className="film-rating__meta">
          <span className="film-rating__level">{getRatingCategoryByRating(film?.rating || 10)}</span>
          <span className="film-rating__count">{film?.scoresCount}</span>
        </p>
      </div>

      <div className="film-card__text">
        <p>{film?.description}</p>

        <p className="film-card__director"><strong>Director: {film?.director}</strong></p>

        <p className="film-card__starring"><strong>Starring: {film?.starring.join(', ')} and other</strong></p>
      </div>
    </>
  );
};

export default OverviewTab;
