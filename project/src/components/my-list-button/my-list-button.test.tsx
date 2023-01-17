import { configureMockStore } from '@jedmao/redux-mock-store';
import { render, screen } from '@testing-library/react';
import MockAdapter from 'axios-mock-adapter';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import thunk from 'redux-thunk';
import { APIRoute, AuthorizationStatus, NameSpace } from '../../common/enums';
import { createAPI } from '../../services/api';
import { makeFakeFilm, makeFakeUser } from '../../utils/mocks';
import MyListButton from './my-list-button';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
const fakeUser = makeFakeUser();
const fakeFilm = makeFakeFilm();
const store = mockStore({
  [NameSpace.User]: { user: fakeUser, authorizationStatus: AuthorizationStatus.Auth, favoriteFilms: [] },
  [NameSpace.App]: { promoFilm: fakeFilm },
  [NameSpace.Film]: { film: null }
});

describe('Component test: MyListButton', () => {
  const api = createAPI();
  const mockAPI = new MockAdapter(api);

  it('Should render correctly', () => {
    mockAPI
      .onGet(APIRoute.Favorite)
      .reply(200, [fakeFilm]);

    render(
      <Provider store={store}>
        <MemoryRouter>
          <MyListButton/>
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByText('My list')).toBeInTheDocument();
  });
});
