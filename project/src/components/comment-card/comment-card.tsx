import { Comment } from '../../types/types';

type CommentCardProps = {
  feedback: Comment;
}

function CommentCard({ feedback }: CommentCardProps): JSX.Element {

  const { user, rating, comment, date } = feedback;

  const dateFormat = new Date('2022-01-13T12:59:09.591Z');

  return (
    <>
      <div className="reviews__user user">
        <div className="reviews__avatar-wrapper user__avatar-wrapper">
          <img className="reviews__avatar user__avatar" src={user.avatarUrl} width="54" height="54"
            alt="Reviews avatar"
          />
        </div>
        <span className="reviews__user-name">
          {user.name}
        </span>
      </div>
      <div className="reviews__info">
        <div className="reviews__rating rating">
          <div className="reviews__stars rating__stars">
            <span style={{ width: `${rating * 20}%` }}></span>
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <p className="reviews__text">
          {comment}
        </p>
        <time className="reviews__time" dateTime={date}>{dateFormat.toLocaleString('en', { month: 'long' })} {dateFormat.toLocaleString('en', { year: 'numeric' })}</time>
      </div>
    </>
  );
}

export default CommentCard;
