import React, { useState, FormEvent } from 'react';
import { ratings } from '../../const';

function CommentForm(): JSX.Element {
  const [rating, setRating] = useState('');
  const [comment, setComment] = useState('');

  const handleRatingChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    setRating(evt.target.value);
  };
  const handleFormSubmit = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    setComment('');
    setRating('');
  };
  const handleTextChange = (evt: React.ChangeEvent<HTMLTextAreaElement>) => {
    setComment(evt.target.value);
  };

  return (
    <form className="reviews__form form" action="#" method="post"
      onSubmit={handleFormSubmit}
    >
      <label className="reviews__label form__label" htmlFor="review">Your review</label>
      <div className="reviews__rating-form form__rating">
        {ratings.map((title, index) => (
          <React.Fragment key={title.id} >
            <input onChange={handleRatingChange} checked={+rating === (5 - index)} className="form__rating-input visually-hidden" name="rating" value={5 - index} id={title.id} type="radio" />
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
        onChange={handleTextChange}
      >
      </textarea>
      <div className="reviews__button-wrapper">
        <p className="reviews__help">
          To submit review please make sure to set <span className="reviews__star">rating</span> and describe your
          stay with at least <b className="reviews__text-amount">50 characters</b>.
        </p>
        <button className="reviews__submit form__submit button" type="submit" disabled>Submit</button>
      </div>
    </form >
  );
}
export default CommentForm;
