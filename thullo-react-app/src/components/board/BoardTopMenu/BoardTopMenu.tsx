import React, { useState } from 'react';
import { useDispatch } from "react-redux";

import { actionCreators as userActionCreators } from "../../../state/user";
import { actionCreators as boardActionCreators } from "../../../state/board";
import { BaseProps, BoardVisibility } from '../../../common/data';
import { concatCssClasses } from '../../../common/functionality';
import css from './BoardTopMenu.module.css';
import { Board } from '../../../models/board';
import Dropdown from '../../common/Dropdown/Dropdown';
import DropdownButton from '../../common/Dropdown/DropdownButton/DropdownButton';
import DropdownContent from '../../common/Dropdown/DropdownContent/DropdownContent';
import BoardVisibilityMenu from '../BoardVisibilityMenu/BoardVisibilityMenu';
import Icon from '../../common/Icon/Icon';
import UserImagesList from '../../user/UserImagesList/UserImagesList';
import Button from '../../common/Button/Button';
import UserSearch from '../../user/UserSearch/UserSearch';
import { User } from '../../../models/user';
import BoardSideMenu from '../BoardSideMenu/BoardSideMenu';

interface BoardTopMenuProps extends BaseProps {
    board: Board;
}

const BoardTopMenu = (props: BoardTopMenuProps) => {
    const dispatch = useDispatch();
    const [isVisibilityDropdownOpened, setIsVisibilityDropdownOpened] = useState(false);
    const [isUserSearchDropdownOpened, setIsUserSearchDropdownOpened] = useState(false);
    const [isSideMenuDisplayed, setIsSideMenuDisplayed] = useState(false);

    const toggleVisibilityDropdown = () => {
        setIsVisibilityDropdownOpened(!isVisibilityDropdownOpened);
    }

    const toggleUserSearchDropdown = () => {
        setIsUserSearchDropdownOpened(!isUserSearchDropdownOpened);
    }

    const handleBoardVisibilityChange = (visibility: BoardVisibility) => {
        const currentBoardVisibility = props.board.isPrivate
            ? BoardVisibility.private
            : BoardVisibility.public;

        if (currentBoardVisibility !== visibility) {
            dispatch(
                boardActionCreators.UpdateBoardVisibilityRequested(props.board.id, visibility === BoardVisibility.private)
            );
            setIsVisibilityDropdownOpened(false);
        }
    }

    const handleUserInvited = (user: User) => {
        const isAlreadyMember = props.board.users.some(u => u.id === user.id);

        if (!isAlreadyMember) {
            dispatch(userActionCreators.InviteToBoardRequested(user.id, props.board.id));
            setIsUserSearchDropdownOpened(false);
        }
    }

    const renderUsersMenu = () => {
        return (
            <div className={css.usersMenu}>
                <UserImagesList users={props.board.users} />

                <Dropdown onClickOutside={() => setIsUserSearchDropdownOpened(false)}>
                    <DropdownButton style={{ width: "40px", height: "40px" }} onClick={toggleUserSearchDropdown} type="primary">
                        <Icon type="person-plus" />
                    </DropdownButton>
                    <DropdownContent isDisplayed={isUserSearchDropdownOpened} offsetY={10}>
                        <UserSearch searchType="Board" onUserConfirmationClick={handleUserInvited} />
                    </DropdownContent>
                </Dropdown>
            </div>
        );
    }

    const renderVisibilityMenu = () => {
        return (
            <Dropdown onClickOutside={() => setIsVisibilityDropdownOpened(false)} style={{ marginRight: "30px" }}>
                <DropdownButton onClick={toggleVisibilityDropdown} type="secondary">
                    {
                        !props.board.isPrivate
                            ? <><Icon style={{ marginBottom: "5px", marginRight: "10px" }} type="unlock" />Public</>
                            : <><Icon style={{ marginBottom: "5px", marginRight: "10px" }} type="lock" />Private</>
                    }
                </DropdownButton>
                <DropdownContent isDisplayed={isVisibilityDropdownOpened} offsetY={10}>
                    <BoardVisibilityMenu onVisibilityChange={handleBoardVisibilityChange} />
                </DropdownContent>
            </Dropdown>
        );
    }

    return (
        <div className={concatCssClasses(css.boardTopMenu, props.className, "container-fluid")}>
            <div className={css.menuLeft}>
                {renderVisibilityMenu()}
                {renderUsersMenu()}
            </div>

            <div className={css.menuRight}>
                <Button onClick={() => setIsSideMenuDisplayed(true)} type="secondary"><Icon type="three-dots" style={{ marginRight: "10px" }} />Show Menu</Button>
            </div>

            {isSideMenuDisplayed && <BoardSideMenu onClose={() => setIsSideMenuDisplayed(false)} />}
        </div>
    );
}

export default BoardTopMenu;