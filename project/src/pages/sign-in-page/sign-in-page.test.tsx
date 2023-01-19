import { configureMockStore } from '@jedmao/redux-mock-store';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import thunk from 'redux-thunk';
import { AuthorizationStatus, NameSpace } from '../../common/enums';
import SignInPage from './sign-in-page';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
const store = mockStore({
  [NameSpace.User]: {
    authorizationStatus: AuthorizationStatus.NoAuth
  }
});

describe('Page test: SignInPage', () => {
  it('Should render correctly', () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <SignInPage/>
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getAllByText('Sign in').length).toEqual(2);
    expect(screen.getByText('Email address')).toBeInTheDocument();
    expect(screen.getByText('Password')).toBeInTheDocument();
  });
});
