import { configureMockStore } from '@jedmao/redux-mock-store';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import { NameSpace } from '../../common/enums';
import { Genre } from '../../types/genre.enum';
import { makeFakeFilm } from '../../utils/mocks';
import GenreList from './genre-list';

const mockStore = configureMockStore();
const fakeFilm = makeFakeFilm();
const store = mockStore({
  [NameSpace.App]: { genre: Genre.AllGenres }
});

describe('Component test: GenreList', () => {
  it('Should render correctly', () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <GenreList genreList={[Genre.AllGenres, fakeFilm.genre]} setVisibleFilmsCount={() => 0}/>
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByText(Genre.AllGenres)).toBeInTheDocument();
    expect(screen.getByText(fakeFilm.genre)).toBeInTheDocument();
  });
});
