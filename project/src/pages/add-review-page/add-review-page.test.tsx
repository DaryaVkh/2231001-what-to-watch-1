import { configureMockStore } from '@jedmao/redux-mock-store';
import { render, screen } from '@testing-library/react';
import MockAdapter from 'axios-mock-adapter';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import thunk from 'redux-thunk';
import { APIRoute, AuthorizationStatus, NameSpace } from '../../common/enums';
import { createAPI } from '../../services/api';
import { makeFakeFilm, makeFakeUser } from '../../utils/mocks';
import AddReviewPage from './add-review-page';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
const fakeFilm = makeFakeFilm();
const fakeUser = makeFakeUser();
const store = mockStore({
  [NameSpace.Film]: {
    film: fakeFilm
  },
  [NameSpace.User]: {
    authorizationStatus: AuthorizationStatus.Auth
  }
});

describe('Page test: AddReviewPage', () => {
  const api = createAPI();
  const mockAPI = new MockAdapter(api);

  it('Should render correctly', () => {
    mockAPI
      .onGet(APIRoute.Login)
      .reply(200, fakeUser);

    render(
      <Provider store={store}>
        <MemoryRouter>
          <AddReviewPage/>
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByText(fakeFilm.name)).toBeInTheDocument();
    expect(screen.getByText('Add review')).toBeInTheDocument();
  });
});
