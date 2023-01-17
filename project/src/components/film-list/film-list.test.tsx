import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { makeFakeFilm } from '../../utils/mocks';
import FilmList from './film-list';

const fakeFilm = makeFakeFilm();

describe('Component test: Logo', () => {
  beforeAll(() => {
    HTMLMediaElement.prototype.load = jest.fn();
  });

  it('Should correctly render', () => {
    const initialEntries = ['/'];
    render(
      <MemoryRouter initialEntries={initialEntries}>
        <FilmList films={[fakeFilm]}/>
      </MemoryRouter>
    );

    expect(screen.getByText(fakeFilm.name)).toBeInTheDocument();
  });
});
