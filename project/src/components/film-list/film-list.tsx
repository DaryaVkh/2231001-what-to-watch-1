import { FC, useState } from 'react';
import { Film } from '../../types/film.type';
import FilmCard from '../film-card/film-card';

type Props = {
  filmList: Film[];
};

const FilmList: FC<Props> = (props) => {
  const { filmList } = props;
  const [, setActiveFilmCard] = useState<number | null>(null);

  return (
    <div className="catalog__films-list">
      {
        filmList.map((film) => <FilmCard key={film.id} film={film} onHover={setActiveFilmCard}/>)
      }
    </div>
  );
};

export default FilmList;
