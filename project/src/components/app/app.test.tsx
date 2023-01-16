import { configureMockStore } from '@jedmao/redux-mock-store';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import thunk from 'redux-thunk';
import { AuthorizationStatus, NameSpace } from '../../common/models';
import { Genre } from '../../types/genre.enum';
import { makeFakeFilm } from '../../utils/mocks';
import App from './app';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
const fakeFilm = makeFakeFilm();

const store = mockStore({
  [NameSpace.User]: {
    authorizationStatus: AuthorizationStatus.Auth,
    user: null,
    favoriteFilms: []
  },
  [NameSpace.App]: {
    films: [fakeFilm],
    genre: Genre.AllGenres,
    promoFilm: fakeFilm,
    isLoading: false
  },
  [NameSpace.Film]: {
    film: fakeFilm,
    similarFilms: [],
    reviews: []
  }
});

const initialEntries = ['/'];

const fakeApp = (
  <Provider store={store}>
    <MemoryRouter initialEntries={initialEntries}>
      <App/>
    </MemoryRouter>
  </Provider>
);

describe('Application Routing', () => {
  beforeAll(() => {
    window.scrollTo = jest.fn();
    HTMLMediaElement.prototype.load = jest.fn();
  });

  it('Should render "MainPage" when user navigate to "/"', () => {
    render(fakeApp);

    expect(screen.getByText('Play')).toBeInTheDocument();
    expect(screen.getByText(`${Genre.AllGenres}`)).toBeInTheDocument();
    expect(screen.getByText('Sign out')).toBeInTheDocument();
  });

  it('Should render "SignInPage" when user navigate to "/login"', () => {
    initialEntries[0] = '/login';
    render(fakeApp);

    expect(screen.getByPlaceholderText('Email address')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Password')).toBeInTheDocument();
  });

  it('Should render "Error404Page" when user navigate to non registered route', () => {
    initialEntries[0] = '/fake-route';
    render(fakeApp);

    expect(screen.getByText('Page not found')).toBeInTheDocument();
  });
});
