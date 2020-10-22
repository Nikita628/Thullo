import React, { useState } from 'react';
import { useDispatch } from "react-redux";

import { CardComment } from '../../../../models/card';
import { BaseProps } from '../../../../common/data';
import { concatCssClasses } from '../../../../common/functionality';
import { actionCreators as cardActionCreators } from "../../../../state/card";
import css from './Comments.module.css';
import Button from '../../../common/ui/Button/Button';
import Comment from "../Comment/Comment";

interface CommentsProps extends BaseProps {
    cardId: number;
    comments: CardComment[];
}

const Comments = (props: CommentsProps) => {
    const dispatch = useDispatch();
    const [text, setText] = useState("");

    const createComment = () => {
        if (text) {
            const newComment = new CardComment();
            newComment.cardId = props.cardId;
            newComment.text = text;
            dispatch(cardActionCreators.CreateComment(newComment));
            setText("");
        }
    }

    return (
        <div className={concatCssClasses(css.comments, props.className)}>
            <textarea
                className={css.commentArea}
                placeholder="Write a comment"
                value={text}
                onChange={e => setText(e.target.value)}
            >
            </textarea>
            <div className={css.buttonContainer}>
                <Button disabled={!text} onClick={createComment} type="primary">Comment</Button>
            </div>
            <div className={css.commentsContainer}>
                {
                    props.comments.map(c => <Comment style={{marginTop: "10px"}} key={c.id} cardId={props.cardId} comment={c} />)
                }
            </div>
        </div>
    );
}

export default Comments;