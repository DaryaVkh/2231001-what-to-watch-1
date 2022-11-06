import { FC } from 'react';
import { Film } from '../../types/film.type';
import { getRatingCategoryByRating } from '../../mocks/films';

type Props = {
  film: Film;
};

const OverviewTab: FC<Props> = (props) => {
  const { film } = props;

  return (
    <>
      <div className="film-rating">
        <div className="film-rating__score">{film.rating}</div>
        <p className="film-rating__meta">
          <span className="film-rating__level">{getRatingCategoryByRating(film.rating || 10)}</span>
          <span className="film-rating__count">{film.scoresCount}</span>
        </p>
      </div>

      <div className="film-card__text">
        <p>{film.description}</p>

        <p className="film-card__director"><strong>Director: {film.director}</strong></p>

        <p className="film-card__starring"><strong>Starring: {film.starring.join(', ')} and other</strong></p>
      </div>
    </>
  );
};

export default OverviewTab;
