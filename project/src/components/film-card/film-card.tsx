import {FC} from 'react';

type Props = {
  title: string;
  posterPath: string;
};

const FilmCard: FC<Props> = (props) => {
  const {
    title,
    posterPath
  } = props;

  return (
    <article className="small-film-card catalog__films-card">
      <div className="small-film-card__image">
        <img src={posterPath} alt={title} width="280" height="175"/>
      </div>
      <h3 className="small-film-card__title">
        <a className="small-film-card__link" href="film-page.html">{title}</a>
      </h3>
    </article>
  );
};

export default FilmCard;
