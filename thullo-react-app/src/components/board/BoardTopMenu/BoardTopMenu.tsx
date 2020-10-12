import React, { CSSProperties, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";

import { actionCreators as userActionCreators } from "../../../state/user";
import { actionCreators as boardActionCreators } from "../../../state/board";
import { BaseProps, BoardVisibility } from '../../../common/data';
import { concatCssClasses } from '../../../common/functionality';
import css from './BoardTopMenu.module.css';
import { Board } from '../../../models/board';
import Dropdown from '../../common/ui/Dropdown/Dropdown';
import DropdownButton from '../../common/ui/Dropdown/DropdownButton/DropdownButton';
import DropdownContent from '../../common/ui/Dropdown/DropdownContent/DropdownContent';
import BoardVisibilityMenu from '../BoardVisibilityMenu/BoardVisibilityMenu';
import Icon from '../../common/ui/Icon/Icon';
import UserImagesList from '../../user/UserImagesList/UserImagesList';
import Button from '../../common/ui/Button/Button';
import UserSearch from '../../user/UserSearch/UserSearch';
import { User } from '../../../models/user';
import BoardSideMenu from '../BoardSideMenu/BoardSideMenu';
import Transition, { AnimationState } from '../../common/ui/Transition/Transition';
import { AppState } from '../../../state';

interface BoardTopMenuProps extends BaseProps {
    board: Board;
}

const BoardTopMenu = (props: BoardTopMenuProps) => {
    const dispatch = useDispatch();
    const boardUsers = useSelector((state: AppState) => state.user.boardUsers);
    const [isVisibilityDropdownOpened, setIsVisibilityDropdownOpened] = useState(false);
    const [isUserSearchDropdownOpened, setIsUserSearchDropdownOpened] = useState(false);
    const [isSideMenuDisplayed, setIsSideMenuDisplayed] = useState(false);

    const toggleVisibilityDropdown = () => {
        setIsVisibilityDropdownOpened(!isVisibilityDropdownOpened);
    }

    const toggleUserSearchDropdown = () => {
        setIsUserSearchDropdownOpened(!isUserSearchDropdownOpened);
    }

    const changeBoardVisibility = (visibility: BoardVisibility) => {
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

    const inviteUser = (user: User) => {
        const isAlreadyMember = boardUsers.some(u => u.id === user.id);

        if (!isAlreadyMember) {
            dispatch(userActionCreators.InviteToBoardRequested(user.id, props.board.id));
            setIsUserSearchDropdownOpened(false);
        }
    }

    const renderUsersMenu = () => {
        return (
            <div className={css.usersMenu}>
                <UserImagesList users={boardUsers} />

                <Dropdown onClickOutside={() => setIsUserSearchDropdownOpened(false)}>
                    <DropdownButton style={{ width: "40px", height: "40px" }} onClick={toggleUserSearchDropdown} type="primary">
                        <Icon type="person-plus" />
                    </DropdownButton>
                    <DropdownContent isDisplayed={isUserSearchDropdownOpened} offsetY={10}>
                        <UserSearch searchType="Board" onUserConfirmationClick={inviteUser} />
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
                    <BoardVisibilityMenu onVisibilityChange={changeBoardVisibility} />
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

            <Transition isIn={isSideMenuDisplayed} timeoutMs={300}>
                {
                    (animationState) => {
                        const animationStyles: CSSProperties = {};
                        if (animationState === AnimationState.exited) {
                            animationStyles.transform = "translateX(100%)"
                        } else if (animationState === AnimationState.exiting) {
                            animationStyles.transform = "translateX(100%)";
                            animationStyles.transition = "all 300ms ease-out";
                        } else if (animationState === AnimationState.entering) {
                            animationStyles.transform = "translateX(0)";
                            animationStyles.transition = "all 300ms ease-out";
                        }
                        return (
                            <BoardSideMenu
                                style={animationStyles}
                                onClose={() => setIsSideMenuDisplayed(false)}
                            />
                        );
                    }
                }
            </Transition>
        </div>
    );
}

export default BoardTopMenu;