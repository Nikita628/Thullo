import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from "react-redux";

import { CardComment } from '../../../../models/card';
import { BaseProps } from '../../../../common/data';
import { concatCssClasses, formatDate } from '../../../../common/functionality';
import { AppState } from '../../../../state';
import { actionCreators as cardActionCreators } from "../../../../state/card";
import css from './Comments.module.css';
import Button from '../../../common/ui/Button/Button';
import { User } from '../../../../models/user';
import Comment from "../Comment/Comment";

interface CommentsProps extends BaseProps {
    cardId: number;
    comments: CardComment[];
}

const Comments = (props: CommentsProps) => {

    return (
        <div className={concatCssClasses(css.comments, props.className)}>
            <textarea
                className={css.commentArea}
                placeholder="Write a comment"
            >
            </textarea>
            <div className={css.buttonContainer}>
                <Button type="primary">Comment</Button>
            </div>
            <div className={css.commentsArea}>
                {
                    props.comments.map(c => <Comment key={c.id} cardId={props.cardId} comment={c} />)
                }
            </div>
        </div>
    );
}

export default Comments;