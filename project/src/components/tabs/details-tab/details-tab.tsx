import moment from 'moment';
import { FC, useMemo } from 'react';
import { useAppSelector } from '../../../hooks';
import { getFilm } from '../../../store/film-reducer/film-selectors';

const DetailsTab: FC = () => {
  const film = useAppSelector(getFilm);
  const filmDuration = useMemo(() => moment.duration(film?.runTime, 'minutes'), [film]);
  const starring = film?.starring || [];

  return (
    <div className="film-card__text film-card__row">
      <div className="film-card__text-col">
        <p className="film-card__details-item">
          <strong className="film-card__details-name">Director</strong>
          <span className="film-card__details-value">{film?.director}</span>
        </p>
        <p className="film-card__details-item">
          <strong className="film-card__details-name">Starring</strong>
          <span className="film-card__details-value">
            {
              starring.slice(0, 3)
                .join(',\n')
                .split('\n')
                .map((actor, i) => <span key={actor} style={{display: 'block'}}>{`${actor}${i === starring.length - 1 ? '.' : ''}`}</span>)
            }
          </span>
        </p>
      </div>

      <div className="film-card__text-col">
        <p className="film-card__details-item">
          <strong className="film-card__details-name">Run Time</strong>
          <span className="film-card__details-value">{`${filmDuration.hours()}h ${filmDuration.minutes()}m`}</span>
        </p>
        <p className="film-card__details-item">
          <strong className="film-card__details-name">Genre</strong>
          <span className="film-card__details-value">{film?.genre}</span>
        </p>
        <p className="film-card__details-item">
          <strong className="film-card__details-name">Released</strong>
          <span className="film-card__details-value">{film?.released}</span>
        </p>
      </div>
    </div>
  );
};

export default DetailsTab;
