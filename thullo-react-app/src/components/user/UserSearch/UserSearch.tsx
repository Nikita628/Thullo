import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from "react-redux";

import { actionCreators as userActionCreators } from "../../../state/user";
import { BaseProps } from '../../../common/data';
import { concatCssClasses } from '../../../common/functionality';
import { User, UserSearchParam } from '../../../models/user';
import { AppState } from '../../../state';
import css from './UserSearch.module.css';
import InputGroup from '../../common/InputGroup/InputGroup';
import InputGroupInput from '../../common/InputGroup/InputGroupInput/InputGroupInput';
import InputGroupButton from '../../common/InputGroup/InputGroupButton/InputGroupButton';
import Icon from '../../common/Icon/Icon';
import Button from '../../common/Button/Button';

interface UserSearchProps extends BaseProps {
    onUserInvited: (user: User) => void;
}

const defaultSearchParam = {
    param: new UserSearchParam(),
    appendToExistingPage: false,
};

const UserSearch = (props: UserSearchProps) => {
    const dispatch = useDispatch();
    const usersPage = useSelector((state: AppState) => state.user.usersPage);
    const currentBoard = useSelector((state: AppState) => state.board.board);
    const [selectedUser, setSelectedUser] = useState<User>();
    const [searchText, setSearchText] = useState<string>();
    const [searchParam, setSearchParam] = useState<{ param: UserSearchParam, appendToExistingPage: boolean }>(defaultSearchParam);

    useEffect(() => {
        dispatch(userActionCreators.UserSearchRequested(searchParam.param, searchParam.appendToExistingPage))
    }, [searchParam]);

    const handleSearchInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchText(e.target.value);
    }

    const handleSearchButtonClick = () => {
        const newSearchParam = new UserSearchParam();
        newSearchParam.nameOrEmailContains = searchText;
        setSearchParam({ param: newSearchParam, appendToExistingPage: false });
    }

    const handleUserListScroll = (e: any) => {
        const isScrolledToBottom = (e.target.offsetHeight + e.target.scrollTop == e.target.scrollHeight);

        if (isScrolledToBottom) {
            const totalPages = Math.ceil(usersPage.totalCount / searchParam.param.pageSize);
            const hasMorePagesToFetch = totalPages > searchParam.param.pageNumber;

            if (hasMorePagesToFetch) {
                const newSearchParam: UserSearchParam = {
                    ...searchParam.param,
                    pageNumber: searchParam.param.pageNumber + 1
                };
                setSearchParam({ param: newSearchParam, appendToExistingPage: true });
            }
        }
    }

    const handleUserClick = (user: User) => {
        setSelectedUser(user);
    }

    const handleInviteButtonClick = () => {
        const isUserAlreadyMember = currentBoard.users.some(u => u.id === selectedUser.id);
        
        if (selectedUser && !isUserAlreadyMember) {
            dispatch(userActionCreators.InviteToBoardRequested(selectedUser.id, currentBoard.id));
            props.onUserInvited(selectedUser);
        }
    }

    const renderUserList = () => {
        return (
            <div onScroll={handleUserListScroll} className={css.usersList}>
                {
                    usersPage.items.map((u: User, i: number) => {
                        return (
                            <div
                                onClick={() => handleUserClick(u)}
                                key={i}
                                className={concatCssClasses(css.userRow, selectedUser && u.id === selectedUser.id ? css.selectedUserRow : "")}
                            >
                                {
                                    u.img
                                        ? <img className={css.userImg} src={u.img.url} />
                                        : <div className={css.userImgPlaceholder}>{u.firstName[0].toUpperCase() + u.lastName[0].toUpperCase()}</div>
                                }
                                <span>{u.firstName + " " + u.lastName}</span>
                            </div>
                        );
                    })
                }
            </div>
        );
    }

    return (
        usersPage
            ? <div className={concatCssClasses(css.userSearch, props.className)}>
                <h6>Invite to Board</h6>
                <p className="text-muted">Search users you want to invite</p>

                <InputGroup>
                    <InputGroupInput style={{ width: "80%" }} onChange={handleSearchInputChange} />
                    <InputGroupButton style={{ width: "20%" }} onClick={handleSearchButtonClick}><Icon type="search" /></InputGroupButton>
                </InputGroup>

                {renderUserList()}

                <div style={{ textAlign: "center" }}>
                    <Button disabled={!selectedUser} onClick={handleInviteButtonClick} type="primary">Invite</Button>
                </div>
            </div>
            : null
    );
}

export default UserSearch;