import { configureMockStore } from '@jedmao/redux-mock-store';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { AppRoute, AuthorizationStatus, NameSpace } from '../../common/enums';
import PrivateRoute from './private-route';

const mockStore = configureMockStore();

describe('Component test: PrivateRouter', () => {
  let initialEntries: string[];
  beforeEach(() => {
    initialEntries = ['/private'];
  });

  it('Should render component for public route, when user not authorized', () => {
    const store = mockStore({
      [NameSpace.User]: {authorizationStatus: AuthorizationStatus.NoAuth},
    });

    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={initialEntries}>
          <Routes>
            <Route
              path={AppRoute.SignIn}
              element={<h1>Public Route</h1>}
            />
            <Route
              path='/private'
              element={<PrivateRoute><h1>Private Route</h1></PrivateRoute>}
            />
          </Routes>
        </MemoryRouter>
      </Provider>,
    );

    expect(screen.getByText(/Public Route/i)).toBeInTheDocument();
    expect(screen.queryByText(/Private Route/i)).not.toBeInTheDocument();
  });

  it('Should render component for private route, when user authorized', () => {
    const store = mockStore({
      [NameSpace.User]: {authorizationStatus: AuthorizationStatus.Auth},
    });

    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={initialEntries}>
          <Routes>
            <Route
              path={AppRoute.SignIn}
              element={<h1>Public Route</h1>}
            />
            <Route
              path='/private'
              element={<PrivateRoute><h1>Private Route</h1></PrivateRoute>}
            />
          </Routes>
        </MemoryRouter>
      </Provider>,
    );

    expect(screen.getByText(/Private Route/i)).toBeInTheDocument();
    expect(screen.queryByText(/Public Route/i)).not.toBeInTheDocument();
  });
});
