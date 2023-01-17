import { configureMockStore } from '@jedmao/redux-mock-store';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { NameSpace } from '../../common/enums';
import { makeFakeFilm, makeFakeReview } from '../../utils/mocks';
import Tabs from './tabs';

const mockStore = configureMockStore();
const fakeFilm = makeFakeFilm();
const fakeReview = makeFakeReview();
const store = mockStore({
  [NameSpace.Film]: {
    film: fakeFilm,
    reviews: [fakeReview]
  }
});

describe('Component test: Tabs', () => {
  it('Should render correctly', () => {
    render(<Provider store={store}><Tabs/></Provider>);

    expect(screen.getByText('Overview')).toBeInTheDocument();
  });
});
