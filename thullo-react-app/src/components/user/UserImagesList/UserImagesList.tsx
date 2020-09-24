import React, { ReactNode } from 'react';
import { Link } from "react-router-dom";

import { User } from '../../../models/user';
import css from './UserImagesList.module.css';

interface UserImagesListProps {
    users: User[];
    amountOfUsersToDisplay?: number;
}

const UserImagesList = (props: UserImagesListProps) => {
    if (!props.users || !props.users.length) return null;

    const usersToDisplay: ReactNode[] = [];
    const usersCount = props.amountOfUsersToDisplay && props.users.length >= props.amountOfUsersToDisplay
        ? props.amountOfUsersToDisplay
        : props.users.length;

    for (let i = 0; i < usersCount; i++) {
        const userImg = props.users[i].img
            ? <img key={i} className={css.userImg} src={props.users[i].img.url} />
            : <div key={i} className={css.userImgPlaceholder}>
                {props.users[i].firstName[0].toUpperCase() + props.users[i].lastName[0].toUpperCase()}
            </div>

        usersToDisplay.push(userImg);
    }

    return (
        <div className={css.userImagesList}>
            {usersToDisplay}
        </div>
    );
}

export default UserImagesList;