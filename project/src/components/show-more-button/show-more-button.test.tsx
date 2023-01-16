import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import ShowMoreButton from './show-more-button';

describe('Component test: ShowMoreButton', () => {
  it('should show-more-button render correctly', () => {
    const initialEntries = ['/'];
    render(
      <MemoryRouter initialEntries={initialEntries}>
        <ShowMoreButton isVisible setVisibleFilmsCount={jest.fn()}/>
      </MemoryRouter>
    );

    expect(screen.getByText('Show more')).toBeInTheDocument();
  });
});
