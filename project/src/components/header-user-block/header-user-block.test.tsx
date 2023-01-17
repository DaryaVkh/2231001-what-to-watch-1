import { configureMockStore } from '@jedmao/redux-mock-store';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import thunk from 'redux-thunk';
import { AuthorizationStatus, NameSpace } from '../../common/enums';
import { makeFakeUser } from '../../utils/mocks';
import HeaderUserBlock from './header-user-block';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
const fakeUser = makeFakeUser();
const store = mockStore({
  [NameSpace.User]: { user: fakeUser, authorizationStatus: AuthorizationStatus.Auth }
});

describe('Component test: HeaderUserBlock', () => {
  it('Should render correctly', () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <HeaderUserBlock/>
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByAltText('User avatar')).toBeInTheDocument();
  });
});
