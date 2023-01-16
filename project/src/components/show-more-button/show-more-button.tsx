import { Dispatch, FC, SetStateAction } from 'react';
import { VISIBLE_FILMS_COUNT_STEP } from '../../common/models';

type Props = {
  isVisible: boolean;
  setVisibleFilmsCount: Dispatch<SetStateAction<number>>;
};

const ShowMoreButton: FC<Props> = (props) => {
  const { setVisibleFilmsCount, isVisible } = props;

  return (
    <div className="catalog__more" style={{display: isVisible ? 'block' : 'none'}}>
      <button
        className="catalog__button"
        type="button"
        onClick={() => setVisibleFilmsCount((prev) => prev + VISIBLE_FILMS_COUNT_STEP)}
      >
        Show more
      </button>
    </div>
  );
};

export default ShowMoreButton;
