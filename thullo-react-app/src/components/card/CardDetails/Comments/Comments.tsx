import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { Card, CardAttachment, CardComment } from '../../../../models/card';

import { BaseProps } from '../../../../common/data';
import { concatCssClasses } from '../../../../common/functionality';
import { AppState } from '../../../../state';
import { actionCreators as cardActionCreators } from "../../../../state/card";
import PhotoSearch from '../../../common/PhotoSearch/PhotoSearch';
import Dropdown from '../../../common/ui/Dropdown/Dropdown';
import DropdownButton from '../../../common/ui/Dropdown/DropdownButton/DropdownButton';
import DropdownContent from '../../../common/ui/Dropdown/DropdownContent/DropdownContent';
import Icon from '../../../common/ui/Icon/Icon';
import IconBadge from '../../../common/ui/IconBadge/IconBadge';
import css from './Comments.module.css';

interface CommentsProps extends BaseProps {
    cardId: number;
    comments: CardComment[];
}

const Comments = (props: CommentsProps) => {

    return (
        <div className={concatCssClasses(css.comments, props.className)}>
            comments
        </div>
    );
}

export default Comments;