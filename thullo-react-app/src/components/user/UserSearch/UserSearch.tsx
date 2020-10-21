import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from "react-redux";

import { actionCreators as userActionCreators } from "../../../state/user";
import { BaseProps } from '../../../common/data';
import { concatCssClasses } from '../../../common/functionality';
import { User, UserSearchParam } from '../../../models/user';
import { AppState } from '../../../state';
import css from './UserSearch.module.css';
import InputGroup from '../../common/ui/InputGroup/InputGroup';
import InputGroupInput from '../../common/ui/InputGroup/InputGroupInput/InputGroupInput';
import InputGroupButton from '../../common/ui/InputGroup/InputGroupButton/InputGroupButton';
import Icon from '../../common/ui/Icon/Icon';
import Button from '../../common/ui/Button/Button';

interface UserSearchProps extends BaseProps {
    searchType: "Board" | "Card";
    onUserConfirmationClick: (user: User) => void;
}

const defaultSearchParam = {
    param: new UserSearchParam(),
    appendToExistingPage: false,
};

const UserSearch = (props: UserSearchProps) => {
    const dispatch = useDispatch();
    const usersPage = useSelector((state: AppState) => state.user.usersPage);
    const [selectedUser, setSelectedUser] = useState<User>();
    const [searchText, setSearchText] = useState<string>();
    const [searchParam, setSearchParam] = useState<{ param: UserSearchParam, appendToExistingPage: boolean }>(defaultSearchParam);

    useEffect(() => {
        dispatch(userActionCreators.UserSearchRequested(searchParam.param, searchParam.appendToExistingPage))
    }, [searchParam]);

    const changeSearchText = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchText(e.target.value);
    }

    const searchUsers = () => {
        const newSearchParam = new UserSearchParam();
        newSearchParam.nameOrEmailContains = searchText;
        setSearchParam({ param: newSearchParam, appendToExistingPage: false });
    }

    const getNextPage = (e: any) => {
        const isScrolledToBottom = (e.target.offsetHeight + e.target.scrollTop === e.target.scrollHeight);

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

    const selectUser = (user: User) => {
        setSelectedUser(user);
    }

    const inviteUser = () => {
        props.onUserConfirmationClick(selectedUser);
    }

    const renderUserList = () => {
        return (
            <div onScroll={getNextPage} className={css.usersList}>
                {
                    usersPage.items.map((u: User) => {
                        const isUserSelected = selectedUser && u.id === selectedUser.id;
                        return (
                            <div
                                onClick={() => selectUser(u)}
                                key={u.id}
                                className={concatCssClasses(css.userRow, isUserSelected ? css.selectedUserRow : "")}
                            >
                                {
                                    u.img
                                        ? <img alt="" className={css.userImg} src={u.img.url} />
                                        : <div className={css.userImgPlaceholder}>{User.getInitials(u)}</div>
                                }
                                <span>{User.getFullName(u)}</span>
                            </div>
                        );
                    })
                }
            </div>
        );
    }

    return (
        usersPage
        && <div className={concatCssClasses(css.userSearch, props.className)}>
            <h6>Invite to {props.searchType}</h6>
            <p className="text-muted">Search users you want to invite</p>

            <InputGroup>
                <InputGroupInput style={{ width: "80%" }} onChange={changeSearchText} />
                <InputGroupButton style={{ width: "20%" }} onClick={searchUsers}><Icon type="search" /></InputGroupButton>
            </InputGroup>

            {renderUserList()}

            <div style={{ textAlign: "center" }}>
                <Button disabled={!selectedUser} onClick={inviteUser} type="primary">Invite</Button>
            </div>
        </div>
    );
}

export default UserSearch;