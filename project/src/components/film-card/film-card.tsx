import { Dispatch, FC, SetStateAction, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Film } from '../../types/film.type';
import VideoPlayer from '../video-player/video-player';

const DELAY_BEFORE_PLAYING_PREVIEW = 1000;

type Props = {
  film: Film;
  onHover?: Dispatch<SetStateAction<number | null>>;
};

const FilmCard: FC<Props> = (props) => {
  const { film, onHover } = props;
  const [isPlayingPreview, setIsPlayingPreview] = useState<boolean>(false);
  const [isStartToPlayPreview, setIsStartToPlayPreview] = useState<boolean>(false);

  useEffect(() => {
    let startPlaying = true;

    if (isStartToPlayPreview) {
      setTimeout(() => startPlaying && setIsPlayingPreview(true), DELAY_BEFORE_PLAYING_PREVIEW);
    }

    return(() => {
      startPlaying = false;
    });
  }, [isStartToPlayPreview]);

  const handleMouseEnter = () => {
    onHover?.((_) => film.id);
    setIsStartToPlayPreview(true);
  };

  const handleMouseLeave = () => {
    onHover?.((_) => null);
    setIsStartToPlayPreview(false);
    setIsPlayingPreview(false);
  };

  return (
    <article className="small-film-card catalog__films-card" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
      <div className="small-film-card__image">
        <VideoPlayer muted film={film} isPlaying={isPlayingPreview} width={280} height={175}/>
      </div>
      <h3 className="small-film-card__title">
        <Link className="small-film-card__link" to={`/films/${film.id}`}>{film.name}</Link>
      </h3>
    </article>
  );
};

export default FilmCard;
