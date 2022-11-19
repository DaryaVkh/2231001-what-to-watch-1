import { FC } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/store-helpers';
import { FILM_LIST } from '../../mocks/films';
import { changeActiveGenre, resetVisibleFilmsCount, setFilmList } from '../../store/action';
import { Genre } from '../../types/genre.enum';

type Props = {
  genreList: string[];
}

const GenreList: FC<Props> = (props) => {
  const { genreList } = props;
  const { activeGenre } = useAppSelector((state) => state);
  const dispatch = useAppDispatch();

  const handleChangeActiveGenre = (genre: string) => {
    dispatch(changeActiveGenre({ newGenre: genre as Genre }));
    dispatch(setFilmList({ filmList: FILM_LIST.filter((film) => film.genre === genre || genre === Genre.ALL_GENRES) }));
    dispatch(resetVisibleFilmsCount());
  };

  return (
    <ul className="catalog__genres-list">
      {
        genreList.map((genre) => (
          <li className={`catalog__genres-item ${activeGenre === genre ? 'catalog__genres-item--active' : ''}`} key={genre} onClick={() => handleChangeActiveGenre(genre)}>
            <span className="catalog__genres-link">{genre}</span>
          </li>
        ))
      }
    </ul>
  );
};

export default GenreList;
