import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { Card, CardAttachment, CardComment } from '../../../../models/card';

import { BaseProps } from '../../../../common/data';
import { concatCssClasses, formatDate } from '../../../../common/functionality';
import { AppState } from '../../../../state';
import { actionCreators as cardActionCreators } from "../../../../state/card";
import PhotoSearch from '../../../common/PhotoSearch/PhotoSearch';
import Dropdown from '../../../common/ui/Dropdown/Dropdown';
import DropdownButton from '../../../common/ui/Dropdown/DropdownButton/DropdownButton';
import DropdownContent from '../../../common/ui/Dropdown/DropdownContent/DropdownContent';
import Icon from '../../../common/ui/Icon/Icon';
import IconBadge from '../../../common/ui/IconBadge/IconBadge';
import css from './Comments.module.css';
import Button from '../../../common/ui/Button/Button';
import Media from '../../../common/ui/Media/Media';
import { User } from '../../../../models/user';
import TextArea from '../../../common/ui/TextArea/TextArea';

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
                    props.comments.map(c =>
                        <div className={css.comment}>
                            <div className={css.commentHeader}>
                                <Media
                                    text={formatDate(new Date(c.createdDate))}
                                    header={User.getFullName(c.createdBy)}
                                    imgHeight="40px"
                                    imgWidth="40px"
                                    imgSource={c.createdBy.img?.url}
                                    imgPlaceholder={User.getInitials(c.createdBy)}
                                >
                                </Media>
                                <div>
                                    <Button type="link">Edit</Button>
                                    {" - "}
                                    <Button type="link">Delete</Button>
                                </div>
                            </div>
                            <TextArea
                                isFocused={false}
                                text={c.text}
                                readonly={false}
                                onChange={() => { }}
                                onBlur={() => { }}
                            />
                        </div>
                    )
                }
            </div>
        </div>
    );
}

export default Comments;