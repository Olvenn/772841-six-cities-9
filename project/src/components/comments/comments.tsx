import { useAppSelector } from '../../hooks/';
import CommentCard from '../comment-card/comment-card';
import { MAX_COMMENTS } from '../../const';
import { sortByDayAsc } from '../../utils';

function Comments(): JSX.Element {
  const comments = useAppSelector((state) => state.INTERACTION.comments);

  return (
    <div>
      {comments.length !== 0 ?
        <>
          <h2 className="reviews__title">Reviews &middot; <span className="reviews__amount">{comments.length}</span></h2>
          <ul className="reviews__list">
            {[...comments].sort(sortByDayAsc).slice(0, MAX_COMMENTS).map((review) => <li className="reviews__item" key={review.id}><CommentCard feedback={review} /></li>)}
          </ul>
        </>
        : ''}
    </div>
  );
}

export default Comments;
