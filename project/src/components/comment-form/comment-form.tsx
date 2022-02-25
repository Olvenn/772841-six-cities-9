import React, { useState, FormEvent } from 'react';
import { ratingName } from '../../const';

function CommentForm(): JSX.Element {
  const [rating, setRating] = useState('');
  const [comment, setComment] = useState('');

  const handleRatingChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    setRating(evt.target.value);
  };
  // eslint-disable-next-line no-console
  // console.log(rating);
  // Пока нет отправики на сервер
  return (
    <form className="reviews__form form" action="#" method="post"
      onSubmit={(evt: FormEvent<HTMLFormElement>) => {
        evt.preventDefault();
        setComment('');
        setRating('');
      }}
    >
      <input onChange={handleRatingChange} checked={rating === '5'} value="5" className="form__rating-input visually-hidden" name="rating" data-stars="5" id="5-stars" type="radio" />
      <label htmlFor="5-stars" className="reviews__rating-label form__rating-label" title="perfect">
        <svg className="form__star-image" width="37" height="33">
          <use xlinkHref="#icon-star"></use>
        </svg>
      </label>
      <label className="reviews__label form__label" htmlFor="review">Your review</label>
      <div className="reviews__rating-form form__rating">
        {ratingName.map((title, index) => (
          <React.Fragment key={title.id} >
            <input onChange={handleRatingChange} checked={+rating === (5 - index)} className="form__rating-input visually-hidden" name="rating" value={5 - index} id={title.id} type="radio" />
            <label htmlFor={title.id} className="reviews__rating-label form__rating-label" title={title.name}>
              <svg className="form__star-image" width="37" height="33">
                <use xlinkHref="#icon-star"></use>
              </svg>
            </label>
          </React.Fragment>
        ))}
      </div>
      <textarea className="reviews__textarea form__textarea" id="review" name="review"
        placeholder="Tell how was your stay, what you like and what can be improved" value={comment}
        onChange={(evt: React.ChangeEvent<HTMLTextAreaElement>) => { setComment(evt.target.value); }}
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
