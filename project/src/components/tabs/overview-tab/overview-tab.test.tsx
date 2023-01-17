import { configureMockStore } from '@jedmao/redux-mock-store';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { NameSpace } from '../../../common/enums';
import { makeFakeFilm } from '../../../utils/mocks';
import OverviewTab from './overview-tab';

const mockStore = configureMockStore();
const fakeFilm = makeFakeFilm();
const store = mockStore({
  [NameSpace.Film]: {
    film: fakeFilm
  }
});

describe('Component test: OverviewTab', () => {
  it('Should render correctly', () => {
    render(
      <Provider store={store}>
        <OverviewTab/>
      </Provider>
    );

    expect(screen.getByText(fakeFilm.description)).toBeInTheDocument();
    expect(screen.getByText(fakeFilm.rating.toFixed(1))).toBeInTheDocument();
  });
});
