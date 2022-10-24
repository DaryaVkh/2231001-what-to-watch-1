import { FC, useState } from 'react';
import { Film } from '../../types/film.type';
import FilmCard from '../film-card/film-card';

type Props = {
  films: Film[];
};

const FilmList: FC<Props> = (props) => {
  const { films } = props;
  const [, setActiveFilmCard] = useState<number | null>(null);

  return (
    <>
      {
        films.map((film) => <FilmCard key={film.id} film={film} onHover={setActiveFilmCard}/>)
      }
    </>
  );
};

export default FilmList;
