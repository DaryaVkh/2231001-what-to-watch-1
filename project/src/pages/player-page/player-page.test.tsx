import { configureMockStore } from '@jedmao/redux-mock-store';
import { render, screen } from '@testing-library/react';
import MockAdapter from 'axios-mock-adapter';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import thunk from 'redux-thunk';
import { APIRoute, NameSpace } from '../../common/enums';
import { createAPI } from '../../services/api';
import { makeFakeFilm, makeFakeReview } from '../../utils/mocks';
import PlayerPage from './player-page';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
const fakeFilm = makeFakeFilm();
const anotherFakeFilm = makeFakeFilm();
const fakeReview = makeFakeReview();
const store = mockStore({
  [NameSpace.Film]: {
    film: fakeFilm
  },
  [NameSpace.App]: {
    isLoading: false
  }
});

describe('Page test: PlayerPage', () => {
  const api = createAPI();
  const mockAPI = new MockAdapter(api);

  beforeAll(() => {
    window.HTMLMediaElement.prototype.play = jest.fn();
    window.HTMLMediaElement.prototype.pause = jest.fn();
    window.HTMLMediaElement.prototype.load = jest.fn();
  });

  it('Should render correctly', () => {
    mockAPI
      .onGet(`${APIRoute.Films}/${fakeFilm.id}`)
      .reply(200, fakeFilm);
    mockAPI
      .onGet(`${APIRoute.Comments}/${fakeFilm.id}`)
      .reply(200, [fakeReview]);
    mockAPI
      .onGet(`${APIRoute.Films}/${fakeFilm.id}/similar`)
      .reply(200, [anotherFakeFilm]);

    render(
      <Provider store={store}>
        <MemoryRouter>
          <PlayerPage/>
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByText('Toggler')).toBeInTheDocument();
    expect(screen.getByText('Exit')).toBeInTheDocument();
    expect(screen.getByText('Play')).toBeInTheDocument();
    expect(screen.getByText(fakeFilm.name)).toBeInTheDocument();
  });
});
