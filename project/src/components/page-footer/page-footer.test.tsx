import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import PageFooter from './page-footer';

describe('Component test: PageFooter', () => {
  it('Should render correctly', () => {
    render(
      <MemoryRouter>
        <PageFooter/>
      </MemoryRouter>
    );

    expect(screen.getByText('© 2019 What to watch Ltd.')).toBeInTheDocument();
  });
});
