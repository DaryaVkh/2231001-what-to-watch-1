import { configureMockStore } from '@jedmao/redux-mock-store';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { NameSpace } from '../../../common/enums';
import { makeFakeFilm, makeFakeReview } from '../../../utils/mocks';
import ReviewsTab from './reviews-tab';

const mockStore = configureMockStore();
const fakeFilm = makeFakeFilm();
const fakeReview = makeFakeReview();
const store = mockStore({
  [NameSpace.Film]: {
    film: fakeFilm,
    reviews: [fakeReview]
  }
});

describe('Component test: ReviewTab', () => {
  it('Should render correctly', () => {
    render(
      <Provider store={store}>
        <ReviewsTab/>
      </Provider>
    );

    expect(screen.getByText(fakeReview.comment)).toBeInTheDocument();
  });
});
