import { ChangeEvent, FC, FormEvent, Fragment, useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../hooks/store-helpers';
import { fetchFilmReviewsAction, postFilmReviewAction } from '../../store/api-actions';

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
  const [isPostButtonDisabled, setIsPostButtonDisabled] = useState<boolean>(true);
  const [isFormDisabled, setIsFormDisabled] = useState<boolean>(false);
  const [formValue, setFormValue] = useState<ReviewFormValue>({
    starsCount: 0,
    reviewText: ''
  });

  const handleReviewTextChange = useCallback((event: ChangeEvent<HTMLTextAreaElement>) => {
    const reviewText = event.target.value;
    setIsPostButtonDisabled(reviewText.length < 50 || reviewText.length > 400 || formValue.starsCount === 0);
    setFormValue((prevValue) => ({
      ...prevValue,
      reviewText
    }));
  }, [formValue]);

  const handleStarsCountChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    setIsPostButtonDisabled(formValue.reviewText.length < 50 || formValue.reviewText.length > 400);
    setFormValue((prevState) => ({
      ...prevState,
      starsCount: Number(event.target.value)
    }));
  }, [formValue]);

  const onSubmit = useCallback((review: ReviewFormValue) => {
    setIsFormDisabled(true);
    dispatch(postFilmReviewAction({ review: { comment: review.reviewText, rating: review.starsCount }, filmId }))
      .then(() => {
        dispatch(fetchFilmReviewsAction(filmId));
        navigate(`/films/${filmId}`);
      })
      .catch(() => setIsFormDisabled(false));
  }, [dispatch, navigate, filmId]);

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
                <input
                  className="rating__input"
                  id={`star-${cur + 1}`}
                  type="radio"
                  name="rating"
                  value={cur + 1}
                  checked={formValue.starsCount === cur + 1}
                  disabled={isFormDisabled}
                  onChange={handleStarsCountChange}
                />
                <label className="rating__label" htmlFor={`star-${cur + 1}`}>Rating {cur + 1}</label>
              </Fragment>
            )).reverse()
          }
        </div>
      </div>

      <div className="add-review__text">
        <textarea
          className="add-review__textarea"
          name="review-text" id="review-text"
          placeholder="Review text"
          value={formValue.reviewText}
          disabled={isFormDisabled}
          onChange={handleReviewTextChange}
        />
        <div className="add-review__submit">
          {
            isPostButtonDisabled || isFormDisabled
              ? <button className="add-review__btn" type="submit" disabled>Post</button>
              : <button className="add-review__btn" type="submit">Post</button>
          }
        </div>
      </div>
    </form>
  );
};

export default AddReviewForm;
