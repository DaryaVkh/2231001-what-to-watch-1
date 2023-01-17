import { configureMockStore } from '@jedmao/redux-mock-store';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import { makeFakeFilm } from '../../utils/mocks';
import AddReviewForm from './add-review-form';

const mockStore = configureMockStore();
const fakeFilm = makeFakeFilm();
const store = mockStore({});

describe('Component test: AddReviewForm', () => {
  it('Should render correctly', () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <AddReviewForm filmId={fakeFilm.id}/>
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByText('Post')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Review text')).toBeInTheDocument();
    expect(screen.getByLabelText('Rating 1')).toBeInTheDocument();
  });
});
