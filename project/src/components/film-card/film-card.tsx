import { Dispatch, FC, SetStateAction } from 'react';
import { Link } from 'react-router-dom';
import { Film } from '../../types/film.type';

type Props = {
  film: Film;
  onHover?: Dispatch<SetStateAction<number | null>>;
};

const FilmCard: FC<Props> = (props) => {
  const { film, onHover } = props;

  return (
    <article className="small-film-card catalog__films-card" onMouseEnter={() => onHover?.((_) => film.id)} onMouseLeave={() => onHover?.((_) => null)}>
      <div className="small-film-card__image">
        <img src={film.posterImage} alt={film.name} width="280" height="175"/>
      </div>
      <h3 className="small-film-card__title">
        <Link className="small-film-card__link" to={`/films/${film.id}`}>{film.name}</Link>
      </h3>
    </article>
  );
};

export default FilmCard;
