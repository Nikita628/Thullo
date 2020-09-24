import React, { useState } from 'react';
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import css from './UserDropdown.module.css';
import { AppState } from '../../../../state';
import Icon from '../../Icon/Icon';
import { actionCreators as authActionCreators } from "../../../../state/auth";

interface UserDropdownProps {

}

const UserDropdown = (props: UserDropdownProps) => {
    const currentUser = useSelector((state: AppState) => state.auth.user);
    const [isDropdownOpened, setIsDropdownOpened] = useState(false);
    const dispatch = useDispatch();

    const onDropClick = () => {
        setIsDropdownOpened(!isDropdownOpened);
    }

    const onLogoutClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault();
        dispatch(authActionCreators.SignOutRequested());
    }

    return (
        <div className={css.userDropdown}>
            
            <img className={css.userImg} src={currentUser.img.url} />

            <button
                onClick={onDropClick}
                className={css.dropButton}>{currentUser.firstName + " " + currentUser.lastName}
                {
                    isDropdownOpened
                        ? <Icon className={css.dropIcon} type="caret-up-fill" />
                        : <Icon className={css.dropIcon} type="caret-down-fill" />
                }
            </button>

            {
                isDropdownOpened
                    ? <div className={css.dropContent}>
                        <Link to="/profile">Profile</Link>
                        <hr className={css.dropDivider} />
                        <a href="#" onClick={onLogoutClick}>Log Out</a>
                    </div>
                    : null
            }
        </div>
    );
}

export default UserDropdown;