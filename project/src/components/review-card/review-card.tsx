import { FC } from 'react';
import { format } from 'date-fns';
import { Review } from '../../types/review.type';

type Props = {
  review: Review;
};

const ReviewCard: FC<Props> = (props) => {
  const { review } = props;
  const reviewDate = new Date(review.date);

  return (
    <div className="review">
      <blockquote className="review__quote">
        <p className="review__text">{review.comment}</p>

        <footer className="review__details">
          <cite className="review__author">{review.user.name}</cite>
          <time className="review__date" dateTime={format(reviewDate, 'yyyy-MM-dd')}>{format(reviewDate, 'MMMM dd, yyyy')}</time>
        </footer>
      </blockquote>

      <div className="review__rating">{review.rating}</div>
    </div>
  );
};

export default ReviewCard;
