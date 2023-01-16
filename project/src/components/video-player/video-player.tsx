import { FC, useEffect, useRef } from 'react';
import { Film } from '../../types/film.type';

type Props = {
  film: Film;
  muted: boolean;
  isPlaying: boolean;
  width: number;
  height: number;
};

const VideoPlayer: FC<Props> = (props) => {
  const { film, muted, isPlaying, width, height } = props;
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    let isMounted = true;

    if (isMounted) {
      if (videoRef.current === null) {
        return;
      }

      if (isPlaying) {
        videoRef.current.play();
        return;
      }

      videoRef.current.load();
    }

    return () => {
      isMounted = false;
    };
  }, [isPlaying]);

  return (
    <video ref={videoRef} src={film.videoLink} poster={film.posterImage} muted={muted} width={width} height={height}/>
  );
};

export default VideoPlayer;
