import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Error404Page from './error-404-page';

describe('Page test: Error404Page', () => {
  it('Should render correctly', () => {
    render(
      <MemoryRouter>
        <Error404Page/>
      </MemoryRouter>
    );

    expect(screen.getByText('Page not found')).toBeInTheDocument();
  });
});
