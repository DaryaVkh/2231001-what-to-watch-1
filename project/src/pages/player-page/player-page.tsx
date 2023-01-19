import moment from 'moment';
import { FC, useCallback, useEffect, useRef, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import Spinner from '../../components/spinner/spinner';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { fetchFilmAction, fetchFilmReviewsAction, fetchSimilarFilmsAction } from '../../store/api-actions';
import { getIsLoading } from '../../store/app-reducer/app-selectors';
import { getFilm } from '../../store/film-reducer/film-selectors';

const PlayerPage: FC = () => {
  const params = useParams();
  const filmId = Number(params.filmId);
  const film = useAppSelector(getFilm);
  const isLoading = useAppSelector(getIsLoading);
  const dispatch = useAppDispatch();
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [progress, setProgress] = useState<number>(0);
  const [timeLeft, setTimeLeft] = useState<number>(0);

  useEffect(() => {
    let isMounted = true;

    if (isMounted) {
      dispatch(fetchFilmAction(Number(filmId)));
      dispatch(fetchFilmReviewsAction(Number(filmId)));
      dispatch(fetchSimilarFilmsAction(Number(filmId)));
    }

    return () => {
      isMounted = false;
    };
  }, [dispatch, filmId]);

  const handleTimeUpdate = useCallback(() => {
    const currentTime = videoRef?.current?.currentTime;
    const durationTime = videoRef?.current?.duration;

    if (currentTime && durationTime) {
      setTimeLeft(durationTime - currentTime);
      setProgress((currentTime / durationTime) * 100);
    }
  }, []);

  const makeFullscreen = useCallback(() => {
    if (videoRef.current?.requestFullscreen) {
      videoRef.current?.requestFullscreen();
    }
  }, []);

  const formatProgressTime = useCallback((seconds: number) => {
    if (seconds / 60 / 60 < 1) {
      return moment(seconds * 1000).format('-mm:ss');
    }
    return moment(seconds * 1000).format('-hh:mm:ss');
  }, []);

  const toggleIsPlaying = useCallback(() => {
    if (videoRef.current?.paused) {
      videoRef.current?.play();
    } else {
      videoRef.current?.pause();
    }
    setIsPlaying((prev) => !prev);
  }, []);

  if (isLoading) {
    return <Spinner/>;
  }

  return (
    <div className="player">
      <video
        src={film?.videoLink}
        ref={videoRef}
        autoPlay
        muted
        className="player__video"
        poster={film?.posterImage}
        onTimeUpdate={() => handleTimeUpdate()}
      />

      <Link to={`/films/${filmId}`} type="button" className="player__exit">Exit</Link>

      <div className="player__controls">
        <div className="player__controls-row">
          <div className="player__time">
            <progress className="player__progress" value={progress} max="100"/>
            <div className="player__toggler" style={{ left: `${progress}%` }}>Toggler</div>
          </div>
          <div className="player__time-value">{formatProgressTime(timeLeft)}</div>
        </div>

        <div className="player__controls-row">

          <button type="button" className="player__play" onClick={toggleIsPlaying}>
            {
              isPlaying
                ? (
                  <>
                    <svg viewBox="0 0 14 21" width="14" height="21">
                      <use xlinkHref="#pause"/>
                    </svg>
                    <span>Pause</span>
                  </>
                ) : (
                  <>
                    <svg viewBox="0 0 19 19" width="19" height="19">
                      <use xlinkHref="#play-s"/>
                    </svg>
                    <span>Play</span>
                  </>
                )
            }

          </button>
          <div className="player__name">{film?.name}</div>

          <button type="button" className="player__full-screen" onClick={makeFullscreen}>
            <svg viewBox="0 0 27 27" width="27" height="27">
              <use xlinkHref="#full-screen"/>
            </svg>
            <span>Full screen</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default PlayerPage;
