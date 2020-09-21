import React, { ReactNode } from 'react';
import { Link } from "react-router-dom";

import { User } from '../../../models/user';
import css from './UserImagesList.module.css';

interface UserImagesListProps {
    users: User[];
    amountOfUsersToDisplay?: number;
}

const UserImagesList = (props: UserImagesListProps) => {
    const usersToDisplay: ReactNode[] = [];
    const usersCount = props.amountOfUsersToDisplay ? props.amountOfUsersToDisplay : props.users.length;

    for (let i = 0; i < usersCount; i++) {
        usersToDisplay.push(
            // <Link key={i} to={`/user-profile/${props.users[i].id}`}>
                <img className={css.userImg} src={props.users[i].img.url} />
            // </Link>
        );
    }

    return (
        <div className={css.userImagesList}>
            {usersToDisplay}
        </div>
    );
}

export default UserImagesList;