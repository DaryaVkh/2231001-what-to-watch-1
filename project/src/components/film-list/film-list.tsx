import { FC, useState } from 'react';
import { useAppSelector } from '../../hooks/store-helpers';
import FilmCard from '../film-card/film-card';

const FilmList: FC = () => {
  const { filmList } = useAppSelector((state) => state);
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
