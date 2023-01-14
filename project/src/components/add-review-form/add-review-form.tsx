import { ChangeEvent, FC, FormEvent, Fragment, useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppRoute } from '../../common/models';
import { useAppDispatch } from '../../hooks/store-helpers';
import { postFilmReview } from '../../store/api-actions';

type ReviewFormValue = {
  starsCount: number;
  reviewText: string;
};

type Props = {
  filmId: number;
};

const AddReviewForm: FC<Props> = (props) => {
  const { filmId } = props;
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [formValue, setFormValue] = useState<ReviewFormValue>({
    starsCount: 0,
    reviewText: ''
  });

  const handleReviewTextChange = useCallback((event: ChangeEvent<HTMLTextAreaElement>) => {
    setFormValue((prevValue) => ({
      ...prevValue,
      reviewText: event.target.value
    }));
  }, []);

  const handleStarsCountChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    setFormValue((prevState) => ({
      ...prevState,
      starsCount: Number(event.target.value)
    }));
  }, []);

  const onSubmit = useCallback((review: ReviewFormValue) => {
    dispatch(postFilmReview({ review: { comment: review.reviewText, rating: review.starsCount }, filmId })).then(() => {
      navigate(`${AppRoute.Film}/${filmId}`);
    });
  }, [filmId, dispatch, navigate]);

  const handleSubmit = useCallback((event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (formValue.reviewText && formValue.starsCount) {
      onSubmit(formValue);
    }
  }, [formValue, onSubmit]);

  return (
    <form action="#" className="add-review__form" onSubmit={handleSubmit}>
      <div className="rating">
        <div className="rating__stars">
          {
            Array.from(Array(10).keys()).map((cur) => (
              <Fragment key={cur}>
                <input className="rating__input" id={`star-${cur + 1}`} type="radio" name="rating" value={cur + 1} checked={formValue.starsCount === cur + 1} onChange={handleStarsCountChange}/>
                <label className="rating__label" htmlFor={`star-${cur + 1}`}>Rating {cur + 1}</label>
              </Fragment>
            ))
          }
        </div>
      </div>

      <div className="add-review__text">
        <textarea className="add-review__textarea" name="review-text" id="review-text" placeholder="Review text" value={formValue.reviewText} onChange={handleReviewTextChange}/>
        <div className="add-review__submit">
          <button className="add-review__btn" type="submit">Post</button>
        </div>
      </div>
    </form>
  );
};

export default AddReviewForm;
