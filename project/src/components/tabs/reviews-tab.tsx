import { FC } from 'react';
import { useAppSelector } from '../../hooks/store-helpers';
import { getFilmReviews } from '../../store/film/film-selectors';
import ReviewCard from '../review-card/review-card';

const ReviewsTab: FC = () => {
  const reviews = useAppSelector(getFilmReviews);

  return (
    <div className="film-card__reviews film-card__row">
      {
        Array.from(Array(Math.ceil(reviews.length / 3)).keys()).map((cur) => (
          <div key={cur} className="film-card__reviews-col">
            {
              reviews.slice(cur * 3, cur * 3 + 3).map((review) => <ReviewCard key={review.id} review={review} />)
            }
          </div>
        ))
      }
    </div>
  );
};

export default ReviewsTab;
