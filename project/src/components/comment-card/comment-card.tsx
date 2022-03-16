import { Comment } from '../../types/types';

type CommentCardProps = {
  feedback: Comment;
}

function CommentCard({ feedback }: CommentCardProps): JSX.Element {
  const dateFormat = new Date(feedback.date);

  return (
    <>
      <div className="reviews__user user">
        <div className="reviews__avatar-wrapper user__avatar-wrapper">
          <img className="reviews__avatar user__avatar" src={feedback.user.avatarUrl} width="54" height="54"
            alt="Reviews avatar"
          />
        </div>
        <span className="reviews__user-name">
          {feedback.user.name}
        </span>
      </div>
      <div className="reviews__info">
        <div className="reviews__rating rating">
          <div className="reviews__stars rating__stars">
            <span style={{ width: `${feedback.rating * 20}%` }}></span>
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <p className="reviews__text">
          {feedback.comment}
        </p>
        <time className="reviews__time" dateTime={feedback.date}>{dateFormat.toLocaleString('en', { month: 'long' })} {dateFormat.toLocaleString('en', { year: 'numeric' })}</time>
      </div>
    </>
  );
}
export default CommentCard;
