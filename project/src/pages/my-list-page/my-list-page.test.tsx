import { configureMockStore } from '@jedmao/redux-mock-store';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import thunk from 'redux-thunk';
import { NameSpace } from '../../common/enums';
import { makeFakeFilm } from '../../utils/mocks';
import MyListPage from './my-list-page';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
const fakeFilm = makeFakeFilm();
const store = mockStore({
  [NameSpace.User]: {
    favoriteFilms: [fakeFilm]
  }
});

describe('Page test: MyListPage', () => {
  beforeAll(() => {
    window.HTMLMediaElement.prototype.load = jest.fn();
  });

  it('Should render correctly', () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <MyListPage/>
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByText('My list')).toBeInTheDocument();
    expect(screen.getByText('1')).toBeInTheDocument();
    expect(screen.getByText(fakeFilm.name)).toBeInTheDocument();
  });
});
