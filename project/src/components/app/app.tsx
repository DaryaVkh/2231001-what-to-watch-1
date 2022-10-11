import MainPage from '../../pages/main/main-page';
import {TFilm} from '../../types/film.type';

function App(): JSX.Element {
  const promoFilm: TFilm = {
    title: 'The Grand Budapest Hotel',
    posterPath: 'the-grand-budapest-hotel.jpg',
    genre: 'Drama',
    releaseDate: '2014'
  };

  return <MainPage promoFilm={promoFilm} />;
}

export default App;
