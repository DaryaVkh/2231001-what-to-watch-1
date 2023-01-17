import { configureMockStore } from '@jedmao/redux-mock-store';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import thunk from 'redux-thunk';
import { AuthorizationStatus, NameSpace } from '../../common/enums';
import { Genre } from '../../types/genre.enum';
import { makeFakeFilm } from '../../utils/mocks';
import MainPage from './main-page';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
const fakeFilm = makeFakeFilm();
const anotherFakeFilm = makeFakeFilm();
const store = mockStore({
  [NameSpace.User]: {
    authorizationStatus: AuthorizationStatus.NoAuth
  },
  [NameSpace.App]: {
    promoFilm: fakeFilm,
    films: [fakeFilm, anotherFakeFilm],
    isLoading: false,
    genre: Genre.AllGenres
  }
});

describe('Page test: MainPage', () => {
  beforeAll(() => {
    window.HTMLMediaElement.prototype.load = jest.fn();
  });

  it('Should render correctly', () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <MainPage/>
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getAllByText(fakeFilm.name).length).toEqual(2);
    expect(screen.getByText(anotherFakeFilm.name)).toBeInTheDocument();
    expect(screen.getByText('Play')).toBeInTheDocument();
    expect(screen.queryByText('My list')).not.toBeInTheDocument();
  });
});
