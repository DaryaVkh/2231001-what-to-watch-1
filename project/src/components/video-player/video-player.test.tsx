import { render, screen } from '@testing-library/react';
import { makeFakeFilm } from '../../utils/mocks';
import VideoPlayer from './video-player';

const fakeFilm = makeFakeFilm();

describe('Component test: VideoPlayer', () => {
  beforeAll(() => {
    window.HTMLMediaElement.prototype.play = jest.fn();
    window.HTMLMediaElement.prototype.pause = jest.fn();
    window.HTMLMediaElement.prototype.load = jest.fn();
  });

  it('Should render correctly', () => {
    render(
      <VideoPlayer film={fakeFilm} muted isPlaying={false} width={280} height={175}/>
    );

    expect(screen.getByTestId('video-player')).toBeInTheDocument();
  });
});
