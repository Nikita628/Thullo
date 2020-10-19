import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from "react-redux";

import { CardComment } from '../../../../models/card';
import { BaseProps } from '../../../../common/data';
import { concatCssClasses, formatDate } from '../../../../common/functionality';
import { AppState } from '../../../../state';
import { actionCreators as cardActionCreators } from "../../../../state/card";
import css from './Comment.module.css';
import Button from '../../../common/ui/Button/Button';
import Media from '../../../common/ui/Media/Media';
import { User } from '../../../../models/user';
import TextArea from '../../../common/ui/TextArea/TextArea';

interface CommentsProps extends BaseProps {
    cardId: number;
    comment: CardComment;
}

const Comments = (props: CommentsProps) => {
    const [isEditing, setIsEditing] = useState(false);
    const [commentText, setCommentText] = useState(props.comment.text);

    const saveEditedComment = (text: string) => {
        if (text) {
            //dispatch  
        } else {
            setCommentText(props.comment.text);
        }

        setIsEditing(false);
    }

    const deleteComment = () => {
        //dispatch
    }

    return (
        <div className={css.comment}>
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
                    true
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

export default Comments;