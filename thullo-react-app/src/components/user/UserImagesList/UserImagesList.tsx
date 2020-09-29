import React, { ReactNode } from 'react';

import { User } from '../../../models/user';
import css from './UserImagesList.module.css';

interface UserImagesListProps {
    users: User[];
    amountOfUsersToDisplay?: number;
    imgSize?: number;
}

const UserImagesList = (props: UserImagesListProps) => {
    if (!props.users || !props.users.length) return null;

    const usersToDisplay: ReactNode[] = [];
    const usersCount = props.amountOfUsersToDisplay && props.users.length >= props.amountOfUsersToDisplay
        ? props.amountOfUsersToDisplay
        : props.users.length;

    for (let i = 0; i < usersCount; i++) {
        let size: { width: number, height: number };

        if (props.imgSize) {
            size = {
                width: props.imgSize,
                height: props.imgSize
            };
        }

        const userImg = props.users[i].img
            ? <img style={{ ...size }} key={i} className={css.userImg} src={props.users[i].img.url} alt="" />
            : <div style={{ ...size }} key={i} className={css.userImgPlaceholder}>{User.getInitials(props.users[i])}</div>

        usersToDisplay.push(userImg);
    }

    return (
        <div className={css.userImagesList}>
            {usersToDisplay}
        </div>
    );
}

export default UserImagesList;