import React, { useEffect, useState, useRef } from 'react';
import { useSelector, useDispatch } from "react-redux";

import { actionCreators as commonActionCreators } from "../../../state/common";
import { actionCreators as boardActionCreators } from "../../../state/board";
import { BaseProps } from '../../../common/data';
import { concatCssClasses } from '../../../common/functionality';
import { AppState } from '../../../state';
import css from './BoardSideMenu.module.css';
import Icon from '../../common/Icon/Icon';
import IconBadge from '../../common/IconBadge/IconBadge';
import Button from '../../common/Button/Button';

interface BoardSideMenuProps extends BaseProps {
    onClose: () => void;
}

const BoardSideMenu = (props: BoardSideMenuProps) => {
    const board = useSelector((state: AppState) => state.board.board);
    const isCurrentUserAdmin = true;

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
                <div>
                    {/* save cancel buttons */}
                </div>
            </div>

            <div className={css.team}>

            </div>
        </div>
    );
}

export default BoardSideMenu;