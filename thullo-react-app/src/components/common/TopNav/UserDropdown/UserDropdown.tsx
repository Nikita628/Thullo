import React, { useState } from 'react';
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import css from './UserDropdown.module.css';
import { AppState } from '../../../../state';
import Icon from '../../ui/Icon/Icon';
import { actionCreators as authActionCreators } from "../../../../state/auth";

interface UserDropdownProps {

}

const UserDropdown = (props: UserDropdownProps) => {
    const currentUser = useSelector((state: AppState) => state.auth.user);
    const [isDropdownOpened, setIsDropdownOpened] = useState(false);
    const dispatch = useDispatch();

    const toggleUserDropdown = () => {
        setIsDropdownOpened(!isDropdownOpened);
    }

    const logout = (e: React.MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault();
        dispatch(authActionCreators.SignOutRequested());
    }

    return (
        <div className={css.userDropdown}>

            <img alt="" className={css.userImg} src={currentUser.img.url} />

            <button
                onClick={toggleUserDropdown}
                className={css.dropButton}>{currentUser.firstName + " " + currentUser.lastName}
                {
                    isDropdownOpened
                        ? <Icon className={css.dropIcon} type="caret-up-fill" />
                        : <Icon className={css.dropIcon} type="caret-down-fill" />
                }
            </button>

            {
                isDropdownOpened
                && <div className={css.dropContent}>
                    <Link to="/profile">Profile</Link>
                    <hr className={css.dropDivider} />
                    <a href="#" onClick={logout}>Log Out</a>
                </div>
            }
        </div>
    );
}

export default UserDropdown;