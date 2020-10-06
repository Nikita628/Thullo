import React, { useState, useRef } from 'react';
import { useDispatch } from "react-redux";

import { actionCreators } from "../../../state/boardList";
import css from './BoardList.module.css';
import { concatCssClasses } from '../../../common/functionality';
import { BaseProps } from '../../../common/data';
import { BoardList as BoardListModel } from '../../../models/boardList';
import Dropdown from '../../common/ui/Dropdown/Dropdown';
import DropdownButton from '../../common/ui/Dropdown/DropdownButton/DropdownButton';
import Icon from '../../common/ui/Icon/Icon';
import DropdownContent from '../../common/ui/Dropdown/DropdownContent/DropdownContent';
import Card from '../../card/Card/Card';
import Button from '../../common/ui/Button/Button';

interface BoardListProps extends BaseProps {
    boardList: BoardListModel;
}

const BoardList = (props: BoardListProps) => {
    const dispatch = useDispatch();
    const listTitleInputRef = useRef<HTMLInputElement>();
    const [isMenuDisplayed, setIsMenuDisplayed] = useState(false);
    const [isRenaming, setIsRenaming] = useState(false);
    const [listTitle, setListTitle] = useState(props.boardList.title);

    const toggleMenu = () => {
        setIsMenuDisplayed(!isMenuDisplayed);
    }

    const startRenamingList = () => {
        listTitleInputRef.current.focus();
        setIsRenaming(true);
        setIsMenuDisplayed(false);
    }

    const deleteList = () => {

    }

    const renameList = () => {
        if (listTitle && listTitle !== props.boardList.title) {
            dispatch(actionCreators.UpdateBoardListTitle(props.boardList.id, listTitle));
        }
        setIsRenaming(false);
    }

    return (
        <div key={props.key} className={concatCssClasses(css.boardList, props.className)}>

            <div className={css.boardListMenu}>
                <input
                    readOnly={!isRenaming}
                    ref={listTitleInputRef}
                    onChange={(e) => setListTitle(e.target.value)}
                    onBlur={renameList}
                    className={css.listTitleInput}
                    type="text"
                    value={listTitle}
                />

                <Dropdown>
                    <DropdownButton onClick={toggleMenu} type="light"><Icon type="three-dots" /></DropdownButton>
                    <DropdownContent offsetY={5} isDisplayed={isMenuDisplayed}>
                        <div className={css.menuContent}>
                            <Button className={css.listMenuButton} onClick={startRenamingList} type="light">Rename</Button>
                            <hr />
                            <Button className={css.listMenuButton} onClick={deleteList} type="light">Delete this list</Button>
                        </div>
                    </DropdownContent>
                </Dropdown>
            </div>

            <div className={css.cards}>
                {props.boardList.cards.map((c, i) => <Card key={i} card={c} />)}
                <div className={css.addCardButton}>
                    <Button style={{ width: "100%", fontWeight: "bold" }} type="primary-light">Add another card +</Button>
                </div>
            </div>
        </div>
    );
}

export default BoardList;