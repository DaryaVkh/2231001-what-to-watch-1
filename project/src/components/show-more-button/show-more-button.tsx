import { FC } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/store-helpers';
import { incVisibleFilmsCount } from '../../store/action';

const ShowMoreButton: FC = () => {
  const { filmList, visibleFilmsCount } = useAppSelector((state) => state);
  const dispatch = useAppDispatch();

  return (
    <div className="catalog__more" style={{display: filmList.length > visibleFilmsCount ? 'block' : 'none'}}>
      <button className="catalog__button" type="button" onClick={() => dispatch(incVisibleFilmsCount())}>Show more</button>
    </div>
  );
};

export default ShowMoreButton;
