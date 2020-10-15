import React, { useState, useRef } from 'react';
import { useDispatch, useSelector } from "react-redux";

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
import BoardListDeletion from '../BoardListDeletion/BoardListDeletion';
import { Draggable } from '../../common/ui/DragAndDrop/Draggable/Draggable';
import { AppState } from '../../../state';
import TitleCreation from '../../common/TitleCreation/TitleCreation';
import { Card as CardModel } from "../../../models/card";
import { actionCreators as cardActionCreators } from "../../../state/card";

interface BoardListProps extends BaseProps {
    boardList: BoardListModel;
}

const BoardList = (props: BoardListProps) => {
    const dispatch = useDispatch();
    const cards = useSelector((state: AppState) => state.card.boardCards.filter(c => c.boardListId === props.boardList.id));
    const listTitleInputRef = useRef<HTMLInputElement>();
    const [isMenuDisplayed, setIsMenuDisplayed] = useState(false);
    const [isRenaming, setIsRenaming] = useState(false);
    const [listTitle, setListTitle] = useState(props.boardList.title);
    const [isDeletionModalDisplayed, setIsDeletionModalDisplayed] = useState(false);
    const [isCreatingCard, setIsCreatingCard] = useState(false);

    const toggleMenu = () => {
        setIsMenuDisplayed(!isMenuDisplayed);
    }

    const startRenamingList = () => {
        listTitleInputRef.current.focus();
        setIsRenaming(true);
        setIsMenuDisplayed(false);
    }

    const displayDeletionModal = () => {
        setIsMenuDisplayed(false);
        setIsDeletionModalDisplayed(true);
    }

    const renameList = () => {
        if (listTitle && listTitle !== props.boardList.title) {
            dispatch(actionCreators.UpdateBoardListTitle(props.boardList.id, listTitle));
        }
        setIsRenaming(false);
    }

    const deleteList = () => {
        dispatch(actionCreators.DeleteBoardList(props.boardList.id));
        setIsDeletionModalDisplayed(false);
    }

    const createCard = (title: string) => {
        const newCard = new CardModel();
        newCard.boardListId = props.boardList.id;
        newCard.title = title;
        dispatch(cardActionCreators.CreateCard(newCard));
        hideCardCreationDialog();
    }

    const displayCardCreationDialog = () => {
        setIsCreatingCard(true);
    }

    const hideCardCreationDialog = () => {
        setIsCreatingCard(false);
    }

    return (
        <div className={concatCssClasses(css.boardList, props.className)}>
            {
                isDeletionModalDisplayed
                && <BoardListDeletion onConfirm={deleteList} onCancel={() => setIsDeletionModalDisplayed(false)} />
            }

            <div className={css.boardListMenu}>
                <input
                    readOnly={!isRenaming}
                    ref={listTitleInputRef}
                    onChange={(e) => setListTitle(e.target.value)}
                    onBlur={renameList}
                    onFocus={e => e.preventDefault()}
                    className={concatCssClasses(css.listTitleInput, isRenaming ? css.listTitleInputFocused : null)}
                    type="text"
                    value={listTitle}
                />

                <Dropdown className={css.menuDropdown}>
                    <DropdownButton onClick={toggleMenu} type="light"><Icon type="three-dots" /></DropdownButton>
                    <DropdownContent offsetY={5} isDisplayed={isMenuDisplayed}>
                        <div className={css.menuContent}>
                            <Button className={css.listMenuButton} onClick={startRenamingList} type="light">Rename</Button>
                            <hr />
                            <Button className={css.listMenuButton} onClick={displayDeletionModal} type="light">Delete this list</Button>
                        </div>
                    </DropdownContent>
                </Dropdown>
            </div>

            <div className={css.cards}>
                {
                    cards.map((c, i) =>
                        <Draggable key={i} draggableType="card" draggableData={c}>
                            <Card listTitle={props.boardList.title} card={c} />
                        </Draggable>
                    )
                }

                {
                    isCreatingCard
                        ? <TitleCreation placeholder="Enter a title for this card" onSave={createCard} onCancel={hideCardCreationDialog} />
                        : <div className={css.addCardButton}>
                            <Button onClick={displayCardCreationDialog} style={{ width: "100%", fontWeight: "bold" }} type="primary-light">
                                Add another card +
                            </Button>
                        </div>
                }
            </div>
        </div>
    );
}

export default BoardList;