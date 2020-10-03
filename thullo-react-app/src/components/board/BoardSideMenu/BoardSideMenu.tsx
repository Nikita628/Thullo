import React, { useEffect, useState, useRef } from 'react';
import { useSelector, useDispatch } from "react-redux";

import { actionCreators as commonActionCreators } from "../../../state/common";
import { actionCreators as boardActionCreators } from "../../../state/board";
import { BaseProps } from '../../../common/data';
import { concatCssClasses, formatDate } from '../../../common/functionality';
import { AppState } from '../../../state';
import css from './BoardSideMenu.module.css';
import Icon from '../../common/ui/Icon/Icon';
import IconBadge from '../../common/ui/IconBadge/IconBadge';
import Button from '../../common/ui/Button/Button';
import Media from '../../common/ui/Media/Media';
import { User } from '../../../models/user';
import Description from '../../common/Description/Description';

interface BoardSideMenuProps extends BaseProps {
    onClose: () => void;
}

const BoardSideMenu = (props: BoardSideMenuProps) => {
    const dispatch = useDispatch();
    const board = useSelector((state: AppState) => state.board.board);
    const currentUser = useSelector((state: AppState) => state.auth.user);
    const isCurrentUserAdmin = true;//board.createdBy.id === currentUser.id;
    const [boardTitle, setBoardTitle] = useState(board.title);

    const saveTitle = () => {
        if (boardTitle) {
            // dispatch action to save
        } else {
            setBoardTitle(board.title);
        }
    }

    const saveDescription = (description: string) => {
        // dispatch action to save
    }

    const removeUserFromBoard = (userId: number) => {
        // dispatch action to remove
    }

    const renderTeam = () => {
        return (
            <div className={css.team}>
                <div style={{ marginBottom: "10px" }}>
                    <IconBadge icon="list-ul" text="Team" />
                </div>
                <div className={css.teamMember}>
                    <Media
                        imgSource={board.createdBy.img.url}
                        imgWidth="40px"
                        imgHeight="40px"
                        header={User.getFullName(board.createdBy)}
                    />
                    <span>Admin</span>
                </div>
                {
                    board.users.map((u, i) => (
                        <div key={i} className={css.teamMember}>
                            <Media
                                imgSource={u.img.url}
                                imgWidth="40px"
                                imgHeight="40px"
                                header={User.getFullName(u)}
                            />
                            {
                                isCurrentUserAdmin
                                && <Button
                                    style={{ padding: "2px 7px" }}
                                    type="danger-outline"
                                    onClick={() => removeUserFromBoard(u.id)}
                                >Remove
                                </Button>
                            }
                        </div>
                    ))
                }
            </div>
        );
    }

    return (
        <div className={concatCssClasses(css.boardSideMenu, props.className)}>
            <div className={css.menuHeader}>
                <input
                    onBlur={saveTitle}
                    onChange={(e) => setBoardTitle(e.target.value)}
                    type="text"
                    value={boardTitle}
                    readOnly={!isCurrentUserAdmin}
                />
                <span onClick={props.onClose}>
                    <Icon type="x" />
                </span>
            </div>

            <hr />

            <div className={css.madeBy}>
                <div style={{ margin: "10px 0" }}>
                    <IconBadge icon="person-circle" text="Made by" />
                </div>
                <Media
                    imgSource={board.createdBy.img.url}
                    imgWidth="50px"
                    imgHeight="50px"
                    header={User.getFullName(board.createdBy)}
                    text={`on ${formatDate(new Date(board.createdDate))}`}
                />
            </div>

            <Description
                onSave={saveDescription}
                descriptionText={board.description}
                canEdit={isCurrentUserAdmin}
            />

            {renderTeam()}
        </div>
    );
}

export default BoardSideMenu;