import { configureMockStore } from '@jedmao/redux-mock-store';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import { NameSpace } from '../../common/enums';
import { makeFakeFilm } from '../../utils/mocks';
import PlayButton from './play-button';

const mockStore = configureMockStore();
const fakeFilm = makeFakeFilm();
const store = mockStore({
  [NameSpace.App]: { promoFilm: fakeFilm },
});

describe('Component test: PlayButton', () => {
  it('Should render correctly', () => {
    const initialEntries = ['/'];
    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={initialEntries}>
          <PlayButton/>
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByText('Play')).toBeInTheDocument();
  });
});
