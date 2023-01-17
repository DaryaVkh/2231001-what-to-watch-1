import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { makeFakeReview } from '../../utils/mocks';
import ReviewCard from './review-card';

const fakeReview = makeFakeReview();

describe('Component test: ReviewCard', () => {
  it('Should render correctly', () => {
    render(
      <MemoryRouter>
        <ReviewCard review={fakeReview}/>
      </MemoryRouter>
    );

    expect(screen.getByText(fakeReview.comment)).toBeInTheDocument();
    expect(screen.getByText(fakeReview.user.name)).toBeInTheDocument();
    expect(screen.getByText(fakeReview.rating.toFixed(1))).toBeInTheDocument();
  });
});
