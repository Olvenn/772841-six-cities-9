import React, { useState, FormEvent } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { commentAction } from '../../store/api-actions';
import { useEffect } from 'react';
import { ratings, MAX_LENGTH, MIN_LENGTH } from '../../const';
import { CommentData } from '../../types/comment-data';
import { setSuccessfully } from '../../store/reducers/comments';
import {getIsLoadingComments, getSuccessfully} from '../../store/reducers/selectors';

const MAX_RATING = 5;

type CommentFormProps = {
  offerId: number;
}

function CommentForm({ offerId }: CommentFormProps): JSX.Element {
  const dispatch = useAppDispatch();
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');

  const isLoading = useAppSelector(getIsLoadingComments);
  const isSuccessfully = useAppSelector(getSuccessfully);

  const handleRatingChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    setRating(+evt.target.value);
  };
  const handleTextChange = (evt: React.ChangeEvent<HTMLTextAreaElement>) => {
    setComment(evt.target.value);
  };
  const onSubmit = (commentData: CommentData) => {
    dispatch(commentAction(commentData));
  };
  const handleSubmit = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();

    if (rating !== null && comment !== null) {
      onSubmit({ offerId, rating, comment });
      dispatch(setSuccessfully(0));
    }
  };

  useEffect(() => {
    if(isSuccessfully === 1) {
      setRating(0);
      setComment('');
      dispatch(setSuccessfully(0));
    }
  }, [isSuccessfully, dispatch]);

  return (
    <form className="reviews__form form" action="#" method="post"
      onSubmit={handleSubmit}
    >
      <fieldset disabled={isLoading} style={{ border: 0 }}>
        <label className="reviews__label form__label" htmlFor="review">Your review</label>
        <div className="reviews__rating-form form__rating">
          {ratings.map((title, index) => (
            <React.Fragment key={title.id} >
              <input onChange={handleRatingChange} checked={+rating === (MAX_RATING - index)} className="form__rating-input visually-hidden" name="rating" value={MAX_RATING - index} id={title.id} type="radio" />
              <label htmlFor={title.id} className="reviews__rating-label form__rating-label" title={title.name}>
                <svg className="form__star-image" width="37" height="33">
                  <use xlinkHref="#icon-star" />
                </svg>
              </label>
            </React.Fragment>
          ))}
        </div>
        <textarea className="reviews__textarea form__textarea" id="review" name="review"
          placeholder="Tell how was your stay, what you like and what can be improved" value={comment}
          onChange={handleTextChange} minLength={MIN_LENGTH} maxLength={MAX_LENGTH} aria-label="comment"
        >
        </textarea>
      </fieldset>
      <div className="reviews__button-wrapper">
        <p className="reviews__help">
          To submit review please make sure to set <span className="reviews__star">rating</span> and describe your
          stay with at least <b className="reviews__text-amount">50 characters</b>.
        </p>

        <button className="reviews__submit form__submit button" type="submit" disabled={rating === 0 || comment.length < MIN_LENGTH || comment.length > MAX_LENGTH || isLoading}>Submit</button>
      </div>
    </form >
  );
}
export default CommentForm;
