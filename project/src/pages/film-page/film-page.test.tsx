import { configureMockStore } from '@jedmao/redux-mock-store';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import thunk from 'redux-thunk';
import { AuthorizationStatus, NameSpace } from '../../common/enums';
import { makeFakeFilm, makeFakeReview } from '../../utils/mocks';
import FilmPage from './film-page';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
const fakeFilm = makeFakeFilm();
const anotherFakeFilm = makeFakeFilm();
const fakeReview = makeFakeReview();
const store = mockStore({
  [NameSpace.Film]: {
    film: fakeFilm,
    similarFilms: [anotherFakeFilm],
    reviews: [fakeReview]
  },
  [NameSpace.User]: {
    authorizationStatus: AuthorizationStatus.NoAuth
  },
  [NameSpace.App]: {
    promoFilm: fakeFilm
  }
});

describe('Page test: FilmPage', () => {
  beforeAll(() => {
    window.HTMLMediaElement.prototype.load = jest.fn();
  });

  it('Should render correctly', () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <FilmPage/>
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByText(fakeFilm.name)).toBeInTheDocument();
    expect(screen.getByText(fakeFilm.genre)).toBeInTheDocument();
    expect(screen.getByText(fakeFilm.released)).toBeInTheDocument();
    expect(screen.getByText('More like this')).toBeInTheDocument();
    expect(screen.getByText(anotherFakeFilm.name)).toBeInTheDocument();
  });
});
