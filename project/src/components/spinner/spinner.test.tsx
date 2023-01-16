import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Spinner from './spinner';

describe('Component test: Spinner', () => {
  it('Should render correctly', () => {
    const initialEntries = ['/'];
    render(
      <MemoryRouter initialEntries={initialEntries}>
        <Spinner/>
      </MemoryRouter>
    );

    expect(screen.getByTestId('spinner')).toBeInTheDocument();
  });
});
