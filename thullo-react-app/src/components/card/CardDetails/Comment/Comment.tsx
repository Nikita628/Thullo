import React, { useState } from 'react';
import { useDispatch, useSelector } from "react-redux";

import { CardComment } from '../../../../models/card';
import { BaseProps } from '../../../../common/data';
import { formatDate } from '../../../../common/functionality';
import { actionCreators as cardActionCreators } from "../../../../state/card";
import css from './Comment.module.css';
import Button from '../../../common/ui/Button/Button';
import Media from '../../../common/ui/Media/Media';
import { User } from '../../../../models/user';
import TextArea from '../../../common/ui/TextArea/TextArea';
import { AppState } from '../../../../state';

interface CommentsProps extends BaseProps {
    cardId: number;
    comment: CardComment;
}

const Comment = (props: CommentsProps) => {
    const dispatch = useDispatch();
    const currentUser = useSelector((state: AppState) => state.auth.user);
    const [isEditing, setIsEditing] = useState(false);
    const [commentText, setCommentText] = useState(props.comment.text);

    const saveEditedComment = (text: string) => {
        if (text) {
            dispatch(cardActionCreators.UpdateCommentText(props.comment.id, commentText));
        } else {
            setCommentText(props.comment.text);
        }

        setIsEditing(false);
    }

    const deleteComment = () => {
        dispatch(cardActionCreators.DeleteComment(props.comment.id, props.cardId));
    }

    return (
        <div style={{...props.style}} className={css.comment}>
            <div className={css.commentHeader}>
                <Media
                    text={formatDate(new Date(props.comment.createdDate))}
                    header={User.getFullName(props.comment.createdBy)}
                    imgHeight="40px"
                    imgWidth="40px"
                    imgSource={props.comment.createdBy.img?.url}
                    imgPlaceholder={User.getInitials(props.comment.createdBy)}
                >
                </Media>
                {
                    currentUser.id === props.comment.createdBy.id
                    && <div>
                        <Button onClick={() => setIsEditing(true)} type="link">Edit</Button>
                        {" - "}
                        <Button onClick={deleteComment} type="link">Delete</Button>
                        </div>
                }
            </div>
            <TextArea
                style={{marginTop: "5px"}}
                isFocused={isEditing}
                text={commentText}
                readonly={!isEditing}
                onChange={(text: string) => setCommentText(text)}
                onBlur={saveEditedComment}
            />
        </div>
    );
}

export default Comment;