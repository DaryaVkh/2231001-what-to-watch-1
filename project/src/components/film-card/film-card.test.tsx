import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { makeFakeFilm } from '../../utils/mocks';
import FilmCard from './film-card';

const fakeFilm = makeFakeFilm();

describe('Component test: FilmCard', () => {
  beforeAll(() => {
    HTMLMediaElement.prototype.load = jest.fn();
  });
  it('Should render correctly', () => {
    render(
      <MemoryRouter>
        <FilmCard film={fakeFilm}/>
      </MemoryRouter>
    );

    expect(screen.getByText(fakeFilm.name)).toBeInTheDocument();
  });
});
