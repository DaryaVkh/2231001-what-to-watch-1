import { FC } from 'react';
import { REVIEWS_COLUMNS_COUNT } from '../../../common/contants';
import { useAppSelector } from '../../../hooks';
import { getFilmReviews } from '../../../store/film-reducer/film-selectors';
import ReviewCard from '../../review-card/review-card';

const ReviewsTab: FC = () => {
  const reviews = useAppSelector(getFilmReviews);

  return (
    <div className="film-card__reviews film-card__row">
      {
        Array.from(Array(Math.ceil(reviews.length / REVIEWS_COLUMNS_COUNT)).keys()).map((cur) => (
          <div key={cur} className="film-card__reviews-col">
            {
              reviews.slice(
                cur * REVIEWS_COLUMNS_COUNT,
                cur * REVIEWS_COLUMNS_COUNT + REVIEWS_COLUMNS_COUNT
              ).map((review) => <ReviewCard key={review.id} review={review}/>)
            }
          </div>
        ))
      }
    </div>
  );
};

export default ReviewsTab;
