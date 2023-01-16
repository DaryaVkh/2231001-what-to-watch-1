import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Logo from './logo';

describe('Component test: Logo', () => {
  it('Should correctly render', () => {
    const initialEntries = ['/'];
    render(
      <MemoryRouter initialEntries={initialEntries}>
        <Logo/>
      </MemoryRouter>
    );

    expect(screen.getByText('T')).toBeInTheDocument();
  });
});
