import { configureMockStore } from '@jedmao/redux-mock-store';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { NameSpace } from '../../../common/enums';
import { makeFakeFilm } from '../../../utils/mocks';
import DetailsTab from './details-tab';

const mockStore = configureMockStore();
const fakeFilm = makeFakeFilm();
const store = mockStore({
  [NameSpace.Film]: {
    film: fakeFilm
  }
});

describe('Component test: DetailsTab', () => {
  it('Should render correctly', () => {
    render(
      <Provider store={store}>
        <DetailsTab/>
      </Provider>
    );

    expect(screen.getByText(fakeFilm.director)).toBeInTheDocument();
    expect(screen.getByText('Starring')).toBeInTheDocument();
  });
});
