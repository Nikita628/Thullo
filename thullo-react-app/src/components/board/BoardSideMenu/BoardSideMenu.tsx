import React, { useEffect, useState, useRef } from 'react';
import { useSelector, useDispatch } from "react-redux";

import { actionCreators as commonActionCreators } from "../../../state/common";
import { actionCreators as boardActionCreators } from "../../../state/board";
import { BaseProps } from '../../../common/data';
import { concatCssClasses, formatDate } from '../../../common/functionality';
import { AppState } from '../../../state';
import css from './BoardSideMenu.module.css';
import Icon from '../../common/ui/Icon/Icon';
import IconBadge from '../../common/IconBadge/IconBadge';
import Button from '../../common/ui/Button/Button';
import Media from '../../common/ui/Media/Media';
import { User } from '../../../models/user';

interface BoardSideMenuProps extends BaseProps {
    onClose: () => void;
}

const BoardSideMenu = (props: BoardSideMenuProps) => {
    const board = useSelector((state: AppState) => state.board.board);
    const currentUser = useSelector((state: AppState) => state.auth.user);
    const isCurrentUserAdmin = true;//board.createdBy.id === currentUser.id;

    const dispatch = useDispatch();
    const descriptionRef = useRef<HTMLTextAreaElement>();

    const [boardTitle, setBoardTitle] = useState(board.title);
    const [descriptionText, setDescriptionText] = useState(board.description);
    const [isEditingDescription, setIsEditingDescription] = useState(false);

    useEffect(() => {
        descriptionRef.current.style.height = descriptionRef.current.scrollHeight + "px";
    }, [descriptionText])

    const saveTitle = () => {
        if (boardTitle) {
            // dispatch action to save
        } else {
            setBoardTitle(board.title);
        }
    }

    const editDescription = () => {
        setIsEditingDescription(true);
        descriptionRef.current.focus();
    }

    return (
        <div className={concatCssClasses(css.boardSideMenu, props.className)}>

            <div className={css.menuHeader}>
                <form>
                    <input
                        onBlur={saveTitle}
                        onChange={(e) => setBoardTitle(e.target.value)}
                        type="text"
                        value={boardTitle}
                        readOnly={!isCurrentUserAdmin}
                    />
                </form>
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

            <div className={css.description}>
                <div>
                    <IconBadge style={{ marginRight: "15px" }} icon="list-ul" text="Description" />
                    {
                        isCurrentUserAdmin
                        && <Button onClick={editDescription} style={{ padding: "2px 7px" }} type="secondary-outline">
                            <IconBadge icon="pencil-fill" text="Edit" />
                        </Button>
                    }
                </div>
                <textarea
                    onBlur={() => setIsEditingDescription(false)}
                    className={isEditingDescription ? css.editedDescription : ""}
                    onChange={e => setDescriptionText(e.target.value)}
                    ref={descriptionRef}
                    readOnly={!isCurrentUserAdmin || !isEditingDescription}
                    value={descriptionText}
                />
                {
                    isEditingDescription
                    && <div style={{ margin: "10px 0" }}>
                        <Button
                            style={{ padding: "2px 7px" }}
                            onClick={() => { }}
                            type="success"
                        >Save
                        </Button>
                        {" "}
                        <Button
                            style={{ padding: "2px 7px" }}
                            onClick={() => { }}
                            type="light"
                        >Cancel
                        </Button>
                    </div>
                }
            </div>

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
                        <div className={css.teamMember}>
                            <Media
                                imgSource={u.img.url}
                                imgWidth="40px"
                                imgHeight="40px"
                                header={User.getFullName(u)}
                            />
                            {isCurrentUserAdmin && <Button style={{ padding: "2px 7px" }} type="danger-outline">Remove</Button>}
                        </div>
                    ))
                }
            </div>
        </div>
    );
}

export default BoardSideMenu;