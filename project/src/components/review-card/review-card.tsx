import { format } from 'date-fns';
import { FC, useMemo } from 'react';
import { Review } from '../../types/review.type';

type Props = {
  review: Review;
};

const ReviewCard: FC<Props> = (props) => {
  const { review } = props;
  const reviewDate = useMemo(() => new Date(review.date), [review]);
  const dateTime = useMemo(() => format(reviewDate, 'yyyy-MM-dd'), [reviewDate]);
  const time = useMemo(() => format(reviewDate, 'MMMM dd, yyyy'), [reviewDate]);

  return (
    <div className="review">
      <blockquote className="review__quote">
        <p className="review__text">{review.comment}</p>

        <footer className="review__details">
          <cite className="review__author">{review.user.name}</cite>
          <time className="review__date" dateTime={dateTime}>{time}</time>
        </footer>
      </blockquote>

      <div className="review__rating">{review.rating}</div>
    </div>
  );
};

export default ReviewCard;
